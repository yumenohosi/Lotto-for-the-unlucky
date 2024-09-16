import UnluckyLottoGenerator from "@/components/UnluckyLottoGenerator";
import { Metadata } from "next";

interface HomeProps {
  searchParams: { numbers?: string };
}

export async function generateMetadata({ searchParams }: HomeProps): Promise<Metadata> {
  const numbers = searchParams?.numbers?.split(',').join(', ') || '';
  const title = numbers ? `Unlucky Lotto Numbers: ${numbers}` : 'Unlucky Lotto Number Generator';
  const description = numbers ? `Generated unlucky lotto numbers: ${numbers}` : 'Generate your unlucky lotto numbers!';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const ogImage = numbers ? `${baseUrl}/api/og?numbers=${searchParams.numbers}` : `${baseUrl}/default-og.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UnluckyLottoGenerator initialNumbers={searchParams?.numbers} />
    </main>
  );
}
