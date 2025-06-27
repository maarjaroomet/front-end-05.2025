import { useRef, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const form = useRef(null);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if(form.current === null)
      return;

    emailjs
      .sendForm('service_uxamqva', 'template_qe4szc9', form.current, {
        publicKey: 'HSobhMBbK7TahhNu5',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <form ref={form} onSubmit={(e) => sendEmail(e)}>
      <label>Name</label>
      <input type="text" name="from_name" />
      <label>Email</label>
      <input type="email" name="from_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};