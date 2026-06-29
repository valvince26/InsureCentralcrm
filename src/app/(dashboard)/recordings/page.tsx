import RecordingsHeader from "@/features/recordings/components/RecordingsHeader";
import RecordingsTable from "@/features/recordings/components/RecordingsTable";
import SentimentAnalysisCard from "@/features/recordings/components/SentimentAnalysisCard";
import CallTranscriptCard from "@/features/recordings/components/CallTranscriptCard";

export default function RecordingsPage() {
  return (
    <div className="max-w-[1440px] mx-auto p-8 space-y-6 w-full">
      <RecordingsHeader />
      
      {/* Bento Layout Area */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Recordings Table Container */}
        <RecordingsTable />
        
        {/* Details Panel */}
        <div className="col-span-12 lg:col-span-4 space-y-6 lg:sticky lg:top-[88px]">
          <SentimentAnalysisCard />
          <CallTranscriptCard />
        </div>
      </div>
    </div>
  );
}
