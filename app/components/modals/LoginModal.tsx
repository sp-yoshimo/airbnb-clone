'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

import { signIn } from "next-auth/react"

import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";

import { toast } from "react-hot-toast"
import useLoginModal from "@/app/hooks/useLoginModal";

import { useRouter } from "next/navigation"

const LoginModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);


        signIn("credentials", {
            ...data,
            redirect: false
        })
        .then((callback)=>{
            setIsLoading(false);

            if(callback?.ok){
                toast.success("Logged in");
                router.refresh();
                loginModal.onClose();
            }

            if(callback?.error){
                toast.error(callback.error)
            }
        })
    }

    const toggleModal = useCallback(()=>{
        loginModal.onClose();
        registerModal.onOpen()
    },[loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome back"
                subtitle="Login to your account"
            />
            <Input
                register={register}
                id="email"
                label="Email"
                disabled={isLoading}
                errors={errors}
                required
            />
            <Input
                register={register}
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                errors={errors}
                required
            />
        </div>
    )

    const FooterContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => {signIn("google")}}
                disabled={isLoading}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => {signIn("github")}}
                disabled={isLoading}
            />
            <div className="
            text-neutral-500 text-center  mt-4 font-bold
            ">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div>
                        First time using?
                    </div>
                    <div
                        className="text-neutral-800 cursor-pointer hover:underline"
                        onClick={toggleModal}
                    >
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )


    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={FooterContent}
        />
    );
}

export default LoginModal;
