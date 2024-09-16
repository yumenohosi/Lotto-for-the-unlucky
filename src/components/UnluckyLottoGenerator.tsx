"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter, useSearchParams } from 'next/navigation';

const translations = {
  en: {
    title: "Unlucky Lotto Number Generator",
    description: "This generator works as follows:",
    step1: "Generates all possible lotto number combinations (8,145,060 in total).",
    step2: "Shuffles all generated combinations randomly.",
    step3: "Selects the very last combination from the shuffled list.",
    conclusion: "This way, we can pick the most unlucky numbers!",
    generating: "Generating...",
    generate: "Generate Numbers",
    shareTitle: "Unlucky Lotto Numbers",
    shareText: "My unlucky lotto numbers:",
    shareImage: "Share as Image",
    shareToSocial: "Share to Social Media"
  },
  ko: {
    title: "운없는 사람들을 위한 로또 번호 생성기",
    description: "이 생성기는 다음과 같은 원리로 작동합니다:",
    step1: "모든 가능한 로또 번호 조합을 생성합니다 (8,145,060개).",
    step2: "생성된 모든 조합을 무작위로 섞습니다.",
    step3: "섞인 조합 중 가장 마지막 조합을 선택합니다.",
    conclusion: "이렇게 하면 가장 운이 없는 번호를 뽑을 수 있습니다!",
    generating: "생성 중...",
    generate: "번호 생성하기",
    shareTitle: "운없는 사람들을 위한 로또 번호",
    shareText: "내 운없는 로또 번호:",
    shareImage: "이미지로 공유하기",
    shareToSocial: "소셜 미디어로 공유하기"
  }
}

interface UnluckyLottoGeneratorProps {
  initialNumbers?: string;
}

const UnluckyLottoGenerator: React.FC<UnluckyLottoGeneratorProps> = ({ initialNumbers }) => {
  const [numbers, setNumbers] = useState<number[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [lang, setLang] = useState('en')
  const router = useRouter();
  const searchParams = useSearchParams();
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setLang(navigator.language.startsWith('ko') ? 'ko' : 'en')
    if (initialNumbers) {
      setNumbers(initialNumbers.split(',').map(Number));
    } else if (searchParams) {
      const urlNumbers = searchParams.get('numbers');
      if (urlNumbers) {
        setNumbers(urlNumbers.split(',').map(Number));
      }
    }
    setCanShare('share' in navigator);
  }, [initialNumbers, searchParams])

  const t = translations[lang as keyof typeof translations]

  const generateCombinations = () => {
    const allCombinations: number[][] = []
    for (let a = 1; a <= 40; a++) {
      for (let b = a + 1; b <= 41; b++) {
        for (let c = b + 1; c <= 42; c++) {
          for (let d = c + 1; d <= 43; d++) {
            for (let e = d + 1; e <= 44; e++) {
              for (let f = e + 1; f <= 45; f++) {
                allCombinations.push([a, b, c, d, e, f])
              }
            }
          }
        }
      }
    }
    return allCombinations
  }

  const shuffleArray = (array: number[][]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const generateNumbers = () => {
    setIsGenerating(true)
    setNumbers([])

    setTimeout(() => {
      const combinations = generateCombinations()
      const shuffled = shuffleArray(combinations)
      const lastCombination = shuffled[shuffled.length - 1]
      setNumbers(lastCombination)
      setIsGenerating(false)
      
      // URL 업데이트
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('numbers', lastCombination.join(','));
      router.push(newUrl.toString());
    }, 3000)
  }

  const handleShare = async () => {
    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.set('numbers', numbers.join(','));
    
    const shareData = {
      title: t.shareTitle,
      text: `${t.shareText} ${numbers.join(', ')}`,
      url: shareUrl.toString(),
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl sm:text-2xl text-center">{t.title}</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          {t.description}
        </CardDescription>
        <ol className="list-decimal list-inside mt-2 space-y-1 text-sm sm:text-base">
          <li>{t.step1}</li>
          <li>{t.step2}</li>
          <li>{t.step3}</li>
        </ol>
        <p className="text-sm sm:text-base">{t.conclusion}</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center flex-grow">
        <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-white rounded-lg">
          {numbers.length > 0
            ? numbers.map((number, index) => (
                <div
                  key={index}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl sm:text-3xl font-bold"
                >
                  {number}
                </div>
              ))
            : Array(6).fill(0).map((_, index) => (
                <Skeleton key={index} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full" />
              ))}
        </div>
        <Button 
          onClick={generateNumbers} 
          disabled={isGenerating}
          className="w-full py-6 text-lg mb-4"
        >
          {isGenerating ? t.generating : t.generate}
        </Button>
        {numbers.length > 0 && canShare && (
          <Button 
            onClick={handleShare}
            variant="outline"
            className="w-full py-4 text-lg"
          >
            {t.shareToSocial}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default UnluckyLottoGenerator