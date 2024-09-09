"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const UnluckyLottoGenerator = () => {
  const [numbers, setNumbers] = useState<number[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

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
    }, 3000)
  }

  return (
    <Card className="w-full h-full sm:h-auto sm:max-w-md mx-auto flex flex-col justify-between">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl sm:text-2xl text-center">운없는 사람들을 위한 로또 번호 생성기</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          이 생성기는 다음과 같은 원리로 작동합니다:
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>모든 가능한 로또 번호 조합을 생성합니다 (8,145,060개).</li>
            <li>생성된 모든 조합을 무작위로 섞습니다.</li>
            <li>섞인 조합 중 가장 마지막 조합을 선택합니다.</li>
          </ol>
          이렇게 하면 가장 운이 없는 번호를 뽑을 수 있습니다!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center flex-grow">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {isGenerating
            ? Array(6).fill(0).map((_, index) => (
                <Skeleton key={index} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full" />
              ))
            : numbers.map((number, index) => (
                <div
                  key={index}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl sm:text-3xl font-bold"
                >
                  {number}
                </div>
              ))}
        </div>
        <Button 
          onClick={generateNumbers} 
          disabled={isGenerating}
          className="w-full py-6 text-lg"
        >
          {isGenerating ? "생성 중..." : "번호 생성하기"}
        </Button>
      </CardContent>
    </Card>
  )
}

export default UnluckyLottoGenerator