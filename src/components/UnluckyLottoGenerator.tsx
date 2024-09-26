"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter, useSearchParams } from 'next/navigation';
import { generateUnluckyLottoNumbers } from "@/utils/lottoGenerator";
import { useTranslations, Language, translations } from "@/utils/translations";

interface UnluckyLottoGeneratorProps {
  initialNumbers?: string;
}

const UnluckyLottoGenerator: React.FC<UnluckyLottoGeneratorProps> = ({ initialNumbers }) => {
  const [numbers, setNumbers] = useState<number[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [lang, setLang] = useState<Language>('en')
  const router = useRouter();
  const searchParams = useSearchParams();
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    const userLang = navigator.language.split('-')[0];
    setLang(userLang in translations ? userLang as Language : 'en');
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

  const t = useTranslations(lang)

  const generateNumbers = () => {
    setIsGenerating(true)
    setNumbers([])

    setTimeout(() => {
      const lastCombination = generateUnluckyLottoNumbers()
      setNumbers(lastCombination)
      
      // URL 업데이트
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('numbers', lastCombination.join(','));
      router.push(newUrl.toString());
      setIsGenerating(false)
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
    <Card className="w-full max-w-lg mx-auto sm:rounded-lg sm:shadow-md">
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
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-8 p-2 sm:p-4 bg-white rounded-lg">
          {numbers.length > 0
            ? numbers.map((number, index) => (
                <div
                  key={index}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold"
                >
                  {number}
                </div>
              ))
            : Array(6).fill(0).map((_, index) => (
                <Skeleton key={index} className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full" />
              ))}
        </div>
        <Button 
          onClick={generateNumbers} 
          disabled={isGenerating}
          className="w-full py-4 sm:py-6 text-base sm:text-lg mb-4"
        >
          {isGenerating ? t.generating : t.generate}
        </Button>
        {numbers.length > 0 && canShare && (
          <Button 
            onClick={handleShare}
            variant="outline"
            className="w-full py-3 sm:py-4 text-base sm:text-lg"
          >
            {t.shareToSocial}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default UnluckyLottoGenerator