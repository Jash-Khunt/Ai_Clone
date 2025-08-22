import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ⬅️ Import for navigation
import StepIndicator from '../components/StepIndicator';
import Step1InputMethod from '../components/Step1InputMethod';
import Step2CurriculumGrade from '../components/Step2CurriculumGrade';
import Step3UploadContent from '../components/Step3UploadContent';
import Step3TypeTopic from '../components/Step3TypeTopic';
import Step4Customization from '../components/Step4Customization';
import PageHeader from '../components/PageHeader';

const WorksheetGenerator = () => {
  const [step, setStep] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0); 
  const [inputMethod, setInputMethod] = useState<'upload' | 'type' | 'sample' | null>(null);
  const navigate = useNavigate(); 

  const goNext = () => {
    setStep((prev) => {
      const nextStep = prev + 1;
      setMaxStepReached((prevMax) => Math.max(prevMax, nextStep));
      return nextStep;
    });
  };

  const goBack = () => setStep((prev) => prev - 1);

  const handleGenerate = () => {
    navigate('/generated-worksheet'); 
  };

  return (
    <>
      <PageHeader />
      <div style={{ maxWidth: 800, margin: 'auto', padding: 24 }}>
        <StepIndicator currentStep={step} maxStepReached={maxStepReached} />
        <br />

        {step === 0 && (
          <Step1InputMethod
            onSelect={(method) => {
              setInputMethod(method);
              goNext();
            }}
          />
        )}

        {step === 1 && (
          <Step2CurriculumGrade
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {step === 2 && inputMethod === 'upload' && (
          <Step3UploadContent onNext={goNext} onBack={goBack} />
        )}
        {step === 2 && inputMethod === 'type' && (
          <Step3TypeTopic onNext={goNext} onBack={goBack} />
        )}

        {step === 3 && (
          <Step4Customization
            onBack={goBack}
            onNext={handleGenerate} 
            // ⬅️ Trigger navigation on final step
          />
        )}
      </div>
    </>
  );
};

export default WorksheetGenerator;