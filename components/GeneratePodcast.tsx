import React, { useState } from "react";
import { GeneratePodcastProps } from "@/types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as v4uuid } from "uuid";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useToast } from "@/components/ui/use-toast";

const useGeneratePodcast = ({
  setAudio,
  voiceType,
  voicePrompt,
  setAudioStorageId,
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const { toast } = useToast();
  const getPodcastAudio = useAction(api.openai.generateAudioAction); // on réupère l'action en mettant le nom du service (openai) crée dans le dossier convex
  const getAudioUrl = useMutation(api.podcasts.getUrl);

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio("");

    if (!voicePrompt) {
      toast({
        title:
          "Veuillez remplir tous les champs nécessaires avant générer un podcasts.",
      });
      return setIsGenerating(false);
    }

    try {
      const response = await getPodcastAudio({
        voice: voiceType.toLowerCase(),
        input: voicePrompt,
      });

      const blob = new Blob([response], { type: "audio/mpeg" });
      const fileName = `podcast-${v4uuid()}.mp3`;
      const file = new File([blob], fileName, { type: "audio/mpeg" });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;
      const audioUrl = await getAudioUrl({ storageId });
      setAudioStorageId(storageId);
      setAudio(audioUrl!);
      setIsGenerating(false);

      toast({
        title: "Podcast généré avec succès !",
      });
    } catch (error) {
      toast({
        title: "Erreur lors de la génération du podcasts.",
        variant: "destructive",
      });
      console.log("Erreur lors de la génération du podcasts : ", error);
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generatePodcast,
  };
};

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);

  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold text-white-1">
          Insérez un prompt pour générer un podcast
        </Label>
        <Textarea
          className="input-class font-light focus-visible:ring-offset-orange-1 text-white-1"
          placeholder="Bienvenue à tous dans ce podcast sur..."
          rows={5}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
        />
      </div>

      <div className="mt-5 w-full max-w-[200px]">
        <Button
          type="submit"
          className="text-16 bg-orange-1 py-4 font-bold text-white-1"
          onClick={generatePodcast}
        >
          {isGenerating ? (
            <>
              Génération en cours...
              <Loader size={20} className="animate-spin mr-1" />{" "}
            </>
          ) : (
            "Générer le podcasts"
          )}
        </Button>
      </div>
      {props.audio && (
        <audio
          controls
          src={props.audio}
          autoPlay
          className="mt-5"
          onLoadedMetadata={(e) =>
            props.setAudioDuration(e.currentTarget.duration)
          }
        />
      )}
    </div>
  );
};
export default GeneratePodcast;
