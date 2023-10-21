import { baseUrl } from '@/src/data/fetchDataFromFireBase';
import { FacebookIcon, GithubMainIcon, GmailIcon, InstagramIcon, LinkArrow, LinkedinMainIcon, LoaderIcon } from '../Icons';
import useInput from '../hooks/useInput';
import css from './contact.module.scss'
import { motion } from "framer-motion";
import { useState } from 'react';
import Link from 'next/link';

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
const phonePattern = (value) => value.match("[789][0-9]{9}") && value.length === 10;

const Contact = ({ data }) => {

  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  const toggleShowSuccessScreen = () => {
    setShowSuccessScreen(!showSuccessScreen);
  };

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputFocusHandler: firstNameFocusHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputFocusHandler: lastNameFocusHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputFocusHandler: emailFocusHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: phoneValue,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputFocusHandler: phoneFocusHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhone,
  } = useInput(phonePattern);

  const {
    value: messValue,
    isValid: messIsValid,
    hasError: messHasError,
    valueChangeHandler: messChangeHandler,
    inputFocusHandler: messFocusHandler,
    inputBlurHandler: messBlurHandler,
    reset: resetMess,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid && phoneIsValid && messIsValid) {
    formIsValid = true;
  }

  const submitMailsToFireBase = async () => {
    let url = baseUrl + "Mails.json"
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ firstNameValue, lastNameValue, emailValue, phoneValue, messValue })
    })
    resetFirstName();
    resetLastName();
    resetEmail();
    resetPhone();
    resetMess();
    setShowLoader(false);
    toggleShowSuccessScreen();
  }

  const submitHandler = event => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    setShowLoader(true);
    submitMailsToFireBase();
  };


  return (
    <div className={css['contact-container']}>
      <div className={`${css.contactInfo} bg-dark dark:bg-light text-center text-light dark:text-dark lg:flex-col`}>
        <h2 className='m-auto mb-10 font-medium'>Contact Info</h2>
        <div className='font-medium'> Want to hire me or have an idea to discuss ? Shoot me an email if you want to connect!
        </div>
        <span className='mt-7 font-medium'>You can also find me on below links if that&apos;s more your speed</span>
        <ul className={`${css.sci}`}>
          <motion.a
            href={data.faceBook.link}
            target="_blank"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.7 }}
            className="w-6 mr-3 -ml-1"
          >
            <FacebookIcon />
          </motion.a>

          <motion.a
            href={data.insta.link}
            target="_blank"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.7 }}
            className="w-6 mx-3"
          >
            <InstagramIcon />
          </motion.a>
          <motion.a
            href={data.linkedIn.link}
            target="_blank"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 mx-3"
          >
            <LinkedinMainIcon />
          </motion.a>
          <motion.a
            href={data.github.link}
            target="_blank"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 mx-3"
          >
            <GithubMainIcon />
          </motion.a>
        </ul>
        <span className='mt-7 font-medium text-center m-auto'>Download My Resume</span>
        <div className='flex m-auto mt-7 items-center justify-center '>
          <Link href={data.resumeLink} download={true} target="_blank"
            className="flex mr-1 items-center bg-light text-dark p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-dark hover:text-light border-2 border-solid border-transparent hover:border-light dark:bg-dark dark:text-light hover:dark:bg-light hover:dark:text-dark hover:dark:border-dark md:p-2 md:px-4 md:text-base"
          >
            Resume <LinkArrow className={"w-6 ml-1"} />
          </Link>
        </div>
      </div>

      <article className={`${css.contactForm} relative rounded-3xl border border-solid border-dark bg-light shadow-2xl rounded-br-2xl dark:bg-dark dark:border-light xs:rounded-2xl xs:rounded-br-3xl`}>
        <div className="absolute top-0 left-0 -right-3 -z-10 w-[101.5%] h-[102%] rounded-[2.5rem] bg-dark rounded-br-3xl dark:bg-light xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]" />

        {!showSuccessScreen &&
          <><h2 className='text-dark dark:text-light m-auto text-center'>Feel Free To Reach Me</h2>
            <div className={css.formBox}>
              <div className={`${css.inputBox}`}>
                <h6 className='text-dark dark:text-light'>First Name</h6>
                <input className='bg-dark dark:bg-light text-light dark:text-dark placeholder:text-light placeholder:font-medium dark:placeholder:text-dark' type="text" name="firstName" required value={firstNameValue}
                  onChange={firstNameChangeHandler} placeholder='Please enter first name' onFocus={firstNameFocusHandler} onBlur={firstNameBlurHandler}
                />
                {/* <span className='ml-2 text-light dark:text-dark'>Please enter your first name</span> */}
                {firstNameHasError && <p className="mt-2">Please enter first name.</p>}
              </div>
              <div className={css.inputBox}>
                <h6 className='text-dark dark:text-light'>Last Name</h6>
                <input className='bg-dark dark:bg-light text-light dark:text-dark placeholder:text-light placeholder:font-medium dark:placeholder:text-dark' type="text" required value={lastNameValue}
                  placeholder='Please enter last name' onChange={lastNameChangeHandler} onFocus={lastNameFocusHandler} onBlur={lastNameBlurHandler} />
                {lastNameHasError && <p className='mt-2 '>Please enter Last name.</p>}
              </div>
              <div className={css.inputBox}>
                <h6 className='text-dark dark:text-light'>Email Id</h6>

                <input className='bg-dark dark:bg-light text-light dark:text-dark placeholder:text-light placeholder:font-medium dark:placeholder:text-dark' type="text" required value={emailValue}
                  placeholder='Please enter email id' onChange={emailChangeHandler} onFocus={emailFocusHandler} onBlur={emailBlurHandler} />
                {emailHasError && <p className='mt-2 '>Please enter valid email id.</p>}
              </div>
              <div className={css.inputBox}>
                <h6 className='text-dark dark:text-light'>Phone No</h6>

                <input className='bg-dark dark:bg-light text-light dark:text-dark placeholder:text-light placeholder:font-medium dark:placeholder:text-dark' type="text" required value={phoneValue}
                  placeholder='Please enter phone number' onChange={phoneChangeHandler} onFocus={phoneFocusHandler} onBlur={phoneBlurHandler} />
                {phoneHasError && <p className='mt-2 '>Please enter valid phone number.</p>}
              </div>
              <div className={css.inputBox} style={{ width: '100%' }}>
                <h6 className='text-dark dark:text-light'>Message</h6>
                <textarea className='bg-dark dark:bg-light text-light dark:text-dark placeholder:text-light placeholder:font-medium dark:placeholder:text-dark' required value={messValue}
                  placeholder='Please enter message' onChange={messChangeHandler} onFocus={messFocusHandler} onBlur={messBlurHandler}></textarea>
                {messHasError && <p className='mt-2 '>Please enter a message for me.</p>}
              </div>
              <div className='flex m-auto items-center justify-center flex-col'>
                <button onClick={submitHandler} disabled={!formIsValid} className={`flex m-auto items-center ${formIsValid ? 'bg-dark hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark ' : 'bg-slate-400'} text-light p-2.5 focus:ring-blue-700 focus:text-blue-700 px-6 rounded-lg text-lg font-semibold ${formIsValid ? 'dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light' : 'bg-slate-400'} md:p-2 md:px-4 md:text-base`}>
                  {!showLoader ? "Send" : "Sending"}
                  {!showLoader && <LinkArrow className={"w-6 ml-1"} />}
                  {showLoader && <svg aria-hidden="true" role="status" class="inline w-4 h-4 mx-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#11F805" />
                  </svg>}
                </button>
                {!formIsValid && <span className='m-auto text-center mt-2 font-medium text-red-600'>Fill the details above to enable me</span>}
              </div>
            </div>
          </>
        }
        {showSuccessScreen &&
          <div className='flex flex-col items-center justify-center m-auto mt-20'>
            <h3 className='text-center'>Thank You for Contacting Me! </h3>
            <h2 className='text-primary dark:text-primaryDark capitalize text-center'>Your mail has been sent successfully.</h2>
            <h3 className='text-center'>I will respond you soon</h3>

            <button onClick={() => toggleShowSuccessScreen(!showSuccessScreen)}
              className="flex mr-1 items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base">
              Send Again <LinkArrow className={"w-6 ml-1"} />
            </button>

          </div>
        }
      </article>
    </div>

  );
};

export default Contact
