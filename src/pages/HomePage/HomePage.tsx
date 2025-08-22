import { useEffect } from "react";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { increment } from "../../store/slices/counterSlice";
import SeeAiInAction from "../../components/SeeAiInAction";
import PageFooter from "../../components/PageFooter";
import Try from "../../components/Try";
import Features from "../../components/Features";
import HowItWorks from "../../components/HowItWorks";
import PlanSection from "../../components/PlanSection";
import ContactPage from "../../components/ContactPage";
import Notification from "../../components/Notification";
import PageHeader from "../../components/PageHeader";
import HeroSection from "../../components/HeroSection";
import WorksheetProDemo from "../../components/worksheet-pro-demo";
import TrustedEducators from "../../components/trusted-educators";
const HomePage = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  return (
    <div>
      <PageHeader />
      <HeroSection />
      <SeeAiInAction />
      <Try /> 
      <WorksheetProDemo />
      <Features />
      <TrustedEducators />
      <PlanSection region="India" />
      <ContactPage />
      <PageFooter />
    </div>
  );
};

export default HomePage;
