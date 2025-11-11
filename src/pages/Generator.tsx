import { useState } from 'react';
import StarryBackground from '@/components/StarryBackground';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function Generator() {
  const [showInput, setShowInput] = useState(false);
  const [idea, setIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const handleCreateClick = () => {
    setShowInput(true);
  };

  const handleGenerate = async () => {
    if (!idea.trim()) return;

    setIsGenerating(true);
    
    setTimeout(() => {
      setVideoUrl('https://www.youtube.com/embed/dQw4w9WgXcQ');
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden p-6">
      <StarryBackground />
      
      <div className="relative z-10 w-full max-w-3xl animate-fade-in">
        {!showInput && !videoUrl && (
          <div className="text-center">
            <h1 className="text-5xl font-heading font-bold mb-8 text-white floating">
              Создайте видео с помощью AI
            </h1>
            <Button
              onClick={handleCreateClick}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-16 py-8 text-2xl font-semibold animate-pulse-glow"
            >
              <Icon name="Sparkles" className="mr-3" size={28} />
              Создать AI
            </Button>
          </div>
        )}

        {showInput && !videoUrl && (
          <div className="bg-card/30 backdrop-blur-lg p-8 rounded-2xl border-2 border-primary/50 animate-scale-in">
            <h2 className="text-3xl font-heading font-bold mb-6 text-white">
              Опишите вашу идею
            </h2>
            <Textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Например: Космонавт плывет в океане звезд, вокруг него кружатся разноцветные планеты..."
              className="min-h-[200px] text-lg bg-background/50 border-primary/30 text-white placeholder:text-muted-foreground mb-6"
            />
            <Button
              onClick={handleGenerate}
              disabled={!idea.trim() || isGenerating}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-xl font-semibold"
            >
              {isGenerating ? (
                <>
                  <Icon name="Loader2" className="mr-3 animate-spin" size={24} />
                  Генерирую видео...
                </>
              ) : (
                <>
                  <Icon name="Wand2" className="mr-3" size={24} />
                  Создать
                </>
              )}
            </Button>
          </div>
        )}

        {videoUrl && (
          <div className="animate-scale-in">
            <h2 className="text-4xl font-heading font-bold mb-6 text-white text-center">
              Ваше видео готово! 🎉
            </h2>
            <div className="bg-card/30 backdrop-blur-lg p-6 rounded-2xl border-2 border-primary/50">
              <div className="aspect-video bg-black rounded-xl overflow-hidden mb-6">
                <iframe
                  width="100%"
                  height="100%"
                  src={videoUrl}
                  title="Generated Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    setVideoUrl('');
                    setIdea('');
                    setShowInput(true);
                  }}
                  variant="outline"
                  size="lg"
                  className="flex-1 border-primary/50 text-white hover:bg-primary/20"
                >
                  <Icon name="Plus" className="mr-2" size={20} />
                  Создать еще
                </Button>
                <Button
                  onClick={() => window.open(videoUrl.replace('/embed/', '/watch?v='), '_blank')}
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                >
                  <Icon name="Download" className="mr-2" size={20} />
                  Скачать
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
