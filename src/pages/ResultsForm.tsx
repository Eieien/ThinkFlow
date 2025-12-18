import UserLayout from "@/components/layout/User/UserLayout";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function QuizResults() {
  const resultsData = {
    title: "Prog 2 Notes Quiz Results",
    score: 16,
    totalQuestions: 28,
    ranking: "5th",
    totalParticipants: "place",
    finishedIn: "1h 20m",
    questions: [
      { id: 1, text: "What is needed for a linked list?", isCorrect: true },
      { id: 2, text: "question", isCorrect: false },
      { id: 3, text: "question", isCorrect: true },
      { id: 4, text: "question", isCorrect: false },
      { id: 5, text: "question", isCorrect: true },
      { id: 6, text: "question", isCorrect: true },
      { id: 7, text: "question", isCorrect: true },
      { id: 8, text: "question", isCorrect: true },
      { id: 9, text: "question", isCorrect: false },
    ],
  };

  const scorePercentage = (resultsData.score / resultsData.totalQuestions) * 100;

  return (
    <UserLayout title="Quiz Results" description="View your quiz results">
      <h3 className="text-primary-dark text-xl font-bold dark:text-primary-white mb-5">
        {resultsData.title}
      </h3>

      <section className="w-full flex justify-between gap-2">
        <div className="flex flex-col gap-3 w-full mr-5 bg-primary-white dark:bg-[#1A1A1A] rounded-md p-4 border border-[#D6D9DB] dark:border-[#2B2B2B]">
          <h1 className="text-2xl font-bold mb-2">
            8. {resultsData.questions[0].text}
          </h1>
          
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="justify-start h-auto py-3 cursor-pointer">
              a. question
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 cursor-pointer">
              b. question
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 cursor-pointer">
              c. question
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 cursor-pointer">
              d. question
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-90 min-w-[200px]">
          <div className="border border-[#D6D9DB] dark:border-[#2B2B2B] rounded-md p-4 flex flex-col items-center justify-center bg-primary-white dark:bg-[#1A1A1A] text-primary-dark dark:text-primary-white">
            <div className="flex gap-8 mb-6">
              <div className="flex flex-col items-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Score</p>
                <h1 className="font-bold text-3xl">
                  {resultsData.score}/{resultsData.totalQuestions}
                </h1>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Ranking</p>
                <p className="font-bold text-3xl">
                  {resultsData.ranking} <span className="text-base font-normal">{resultsData.totalParticipants}</span>
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
              Finished in
            </p>
            <p className="font-bold text-3xl mb-4">{resultsData.finishedIn}</p>
            <p className="w-full text-center cursor-pointer text-primary-dark dark:text-primary-white hover:text-[#492AE5]">
              View Leaderboards
            </p>
          </div>

          {resultsData.questions.map((question, index) => (
            <Button
              key={question.id}
              variant="outline"
              className={`justify-start cursor-pointer ${
                question.isCorrect
                  ? "!bg-green-500 hover:!bg-green-600 !text-white !border-green-500"
                  : "!bg-red-500 hover:!bg-red-600 !text-white !border-red-500"
              }`}
            >
              {index + 1}. {question.isCorrect ? "Correct" : "Wrong"}
            </Button>
          ))}
        </div>
      </section>
    </UserLayout>
  );
}