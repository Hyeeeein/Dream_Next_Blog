"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Banner, { BannerData } from "./Banner";
import { POST } from "@/app/api/contact/route";
import { sendContactEmail } from "./../service/contact";

export type Form = {
  from: string;
  subject: string;
  message: string;
};

const DEFAULT_DATA = {
  from: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [form, setForm] = useState<Form>(DEFAULT_DATA);
  const [banner, setBanner] = useState<BannerData | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setForm((prev: Form) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendContactEmail(form)
      .then(() => {
        setBanner({
          message: "메일을 성공적으로 보냈습니다!",
          state: "success",
        });
        setForm(DEFAULT_DATA); // 초기화
      })
      .catch(() => {
        setBanner({
          message: "메일 전송에 실패했습니다. 다시 시도해주세요!",
          state: "error",
        });
      })
      .finally(() => {
        // 성공과 실패에 상관없이
        setTimeout(() => {
          setBanner(null);
        }, 3000);
      });
  };
  return (
    <section className="w-full max-w-md">
      {banner && <Banner banner={banner} />}
      <form
        onSubmit={onSubmit}
        className="w-full flex flex-col gap-2 my-4 p-4 bg-slate-700 rounded-xl"
      >
        <label htmlFor="from" className="font-semibold text-white">
          Your Email
        </label>
        <input
          type="email"
          id="from"
          name="from"
          required
          autoFocus
          value={form.from}
          onChange={onChange}
        />
        <label htmlFor="subject" className="font-semibold text-white">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={form.subject}
          onChange={onChange}
        />
        <label htmlFor="message" className="font-semibold text-white">
          Message
        </label>
        <textarea
          rows={10}
          id="message"
          name="message"
          required
          value={form.message}
          onChange={onChange}
          className="text-black"
        />
        <button className="bg-yellow-300 text-black font-bold hover:bg-yellow-400 rounded">
          Submit
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
