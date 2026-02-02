import ChangeTextButton from '@/components/6ChangeTextButton';
import TextAnimations from '@/components/7TextAnimations';
import AnimateButton from '@/components/1AnimateButton';
import CardContent from '@/components/2Card';
import Dashboard from '@/components/3Dashboard';
import MotionHooks from '@/components/4MotionHooks';
import Timeline from '@/components/4Timeline';
import Layout from '@/components/5Layout';
import Navbar from '@/components/5Navbar';
import ChangeNumber from '@/components/6ChangeNumber';

export default function Home() {
  return (
    <>
      <AnimateButton />
      <CardContent />
      <Dashboard />
      <MotionHooks />
      <Timeline />
      <Layout />
      <Navbar />
      <ChangeNumber />
      <ChangeTextButton />
      <TextAnimations />
    </>
  );
}
