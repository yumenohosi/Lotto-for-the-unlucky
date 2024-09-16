import React from 'react';
import { Button } from './ui/button';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, text, url }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        console.log('Content shared successfully');
      } catch (error) {
        console.log('Error sharing content:', error);
      }
    } else {
      // 대체 공유 방법 (예: 클립보드에 복사)
      const shareText = `${title}\n${text}\n${url}`;
      navigator.clipboard.writeText(shareText);
      alert('공유 링크가 클립보드에 복사되었습니다.');
    }
  };

  return (
    <Button onClick={handleShare} variant="outline" size="sm">
      <Share2 className="mr-2 h-4 w-4" /> 공유하기
    </Button>
  );
};

export default ShareButton;