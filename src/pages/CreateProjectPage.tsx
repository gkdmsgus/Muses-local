import { useState } from 'react';
import Stepper from '../components/CreateProjectPage/Stepper';
import OverviewStep from '../components/CreateProjectPage/steps/OverviewStep';
import FundingStep from '../components/CreateProjectPage/steps/FundingStep';
import RewardStep from '../components/CreateProjectPage/steps/RewardStep';
import StoryStep from '../components/CreateProjectPage/steps/StoryStep';
import InfoStep from '../components/CreateProjectPage/steps/InfoStep';
import NavigationButtons from '../components/CreateProjectPage/NavigationButtons';
import CreateNavbar from '../components/CreateProjectPage/CreateNavbar';

export interface ProjectData {
  title: string;
  thumbnail: File | null;
  tags: string[];
  age_limit: 'ALL' | 'ADULT';
  summary: string;
  funding: FundingData;
  rewards: RewardData[];
  story: StoryData;
  info: InfoData;
}

export type FundingData = {
  target_amount: number | '';
  startDate: string;
  deadline: string; // YYYY-MM-DD
  opening: string; // HH:mm
};

export type RewardData = {
  reward_id: number;
  reward_name: string;
  price: number | '';
  description: string;
  type: 'TICKET';
  useQr: boolean;
  total_quantity: number | '';
};

export type StoryData = {
  story_html: string;
  refund_policy: string;
};

export type InfoData = {
  host_name: string;
  host_birth: string;
  host_phone: string;
  host_email: string;
  host_address: string;
  manager_name: string | '';
  manager_phone: string | '';
  manager_email: string | '';
};

export default function CreateProjectPage() {
  const [step, setStep] = useState(1);

  const [projectData, setProjectData] = useState<ProjectData>({
    title: '',
    thumbnail: null,
    tags: [],
    age_limit: 'ALL',
    summary: '',
    funding: {
      target_amount: '',
      startDate: '',
      deadline: '',
      opening: '',
    },
    rewards: [
      {
        reward_id: 1,
        reward_name: '',
        price: '',
        description: '',
        type: 'TICKET',
        useQr: false,
        total_quantity: '',
      },
    ],
    story: {
      story_html: '',
      refund_policy: '',
    },
    info: {
      host_name: '',
      host_birth: '',
      host_phone: '',
      host_email: '',
      host_address: '',
      manager_name: '',
      manager_phone: '',
      manager_email: '',
    },
  });

  const updateProjectData = (key: keyof ProjectData, value: unknown) => {
    setProjectData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNextStep = () => {
    setStep((s) => Math.min(5, s + 1));
  };

  return (
    <>
      <CreateNavbar step={step} onNext={handleNextStep} />
      <div className="flex flex-col min-h-screen px-6 pt-28 pb-20 max-w-[768px] mx-auto gap-12">
        <Stepper currentStep={step} />

        {step === 1 && (
          <OverviewStep data={projectData} onChange={updateProjectData} />
        )}
        {step === 2 && (
          <FundingStep data={projectData} onChange={updateProjectData} />
        )}
        {step === 3 && (
          <RewardStep data={projectData} onChange={updateProjectData} />
        )}
        {step === 4 && (
          <StoryStep data={projectData} onChange={updateProjectData} />
        )}
        {step === 5 && (
          <InfoStep data={projectData} onChange={updateProjectData} />
        )}

        <NavigationButtons
          step={step}
          onPrev={() => setStep((s) => Math.max(1, s - 1))}
          onNext={handleNextStep}
        />
      </div>
    </>
  );
}
