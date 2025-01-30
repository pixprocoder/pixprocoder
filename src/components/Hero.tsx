'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { SiUpwork } from 'react-icons/si';
import { TbBrandFiverr } from 'react-icons/tb';
import banner from '../assets/images/banner.png';
import TypedText from './shared/TypedText';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';
import Modal from './shared/Modal';

const Hero = () => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    const { email, projectName, message } = data;
    console.log(email, projectName, message);
    toast({
      title: 'Email Sent',
      description: 'I will get back to you soon.',
      status: 'success',
    });
  };

  return (
    <section
      id="home"
      className="flex flex-col px-4 lg:p-0 lg:flex-row pt-20 my-10 justify-center lg:items-center"
    >
      <div className="flex-1  ">
        <h1 className="text-4xl hidden lg:block font-semibold font-montserrat ">
          HI, <span className="text-[#0084FF]">I'm</span>
        </h1>
        <h1 className="text-3xl lg:text-7xl font-bold">
          <span className="text-[#0084FF]">SAMSUL</span> KOBIR
        </h1>

        <div className="my-8   border-l-2 px-2 border-cyan-600">
          <div className="lg:text-xl flex gap-2  items-center space-y-3">
            💻 Software Engineer with: <TypedText />
          </div>
        </div>

        <div className="flex space-x-4 my-4">
          <Link href="/blog">
            <Button>Explore Blog</Button>
          </Link>
          <div>
            <Modal
              trigger={<Button className="primary-btn">Get A Quote</Button>}
              title="👋 Hi there,"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-4">
                  <span className="my-2 text-gray-300 text-left">
                    What's in your mind? send me an Email. 📩
                  </span>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="input input-bordered input-accent w-full "
                    {...register('email', { required: true })}
                  />{' '}
                  {errors.email && (
                    <span className="text-xs text-red-500">
                      Email field is required
                    </span>
                  )}
                  <Input
                    type="text"
                    placeholder="Project Name"
                    {...register('projectName', { required: true })}
                    className="input input-bordered mt-2 input-accent w-full "
                  />{' '}
                  {errors.projectName && (
                    <span className="text-xs text-red-500">
                      This field is required
                    </span>
                  )}
                  <Textarea
                    {...register('message', { required: true })}
                    className="textarea textarea-info w-full my-2"
                    placeholder="Message"
                  />
                  {errors.message && (
                    <span className="text-xs text-red-500">
                      Message field is required
                    </span>
                  )}
                  <div>
                    <span className="text-sm text-green-600 my-2 text-left">
                      For Freelance Work
                    </span>
                    <div className=" flex gap-4 text-2xl  items-center">
                      <Link
                        className="text-green-500 hover:text-blue-600"
                        href="https://www.fiverr.com/pixprocoder"
                        target="_blank"
                      >
                        <TbBrandFiverr></TbBrandFiverr>
                      </Link>
                      <Link
                        className="text-green-500 hover:text-blue-600 text-left"
                        href="https://www.fiverr.com/pixprocoder"
                        target="_blank"
                      >
                        <SiUpwork></SiUpwork>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex ">
                  <Button
                    type="submit"
                    className="  px-3 py-2 bg-gradient-to-r from-purple-500 to-blue-500  hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-md "
                  >
                    Deliver 🚀
                  </Button>
                </div>
              </form>
            </Modal>
          </div>
        </div>
      </div>
      <div className="flex-1 hidden lg:block">
        <Image src={banner} alt="hero" />
      </div>
    </section>
  );
};

export default Hero;
