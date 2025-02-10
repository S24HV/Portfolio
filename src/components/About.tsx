import myImg from "../assets/Me.jpg";

import TgIcon from "../assets/tg.svg";
import PhoneIcon from "../assets/phone.svg";
import MailIcon from "../assets/mail.svg";

import "./about.scss";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-info-container">
        <div className="about-text">
          <h2>Обо Мне</h2>
          <p> 
          Привет! Меня зовут Амир Сухов, я молодой и амбициозный frontend-разработчик из Узбекистана. Мне 14 лет, и уже более года я активно изучаю программирование, создаю веб-приложения и совершенствую свои навыки.

          Я прошёл курсы Proweb и работаю с такими технологиями, как TypeScript, JavaScript, React, HTML и CSS. Разрабатываю современные, адаптивные и удобные веб-приложения, ориентируясь на производительность, UX/UI-дизайн и чистый код.

          Создаю интерактивные веб-приложения на React. Использую TypeScript для типизации и удобства разработки. Работаю с REST API, интегрирую внешние сервисы. Верстаю адаптивные интерфейсы с помощью HTML, CSS и Tailwind CSS. Развиваюсь в области frontend-разработки, следую лучшим практикам.

          Я постоянно изучаю новые технологии и инструменты, углубляюсь в React-экосистему и хочу в будущем разрабатывать сложные веб-приложения и интерфейсы. Также планирую изучать backend и развиваться как full-stack разработчик.

          Готов к новым проектам, сотрудничеству и вызовам. Если у тебя есть интересное предложение — пиши, я открыт к общению.
          </p>
        </div>
        <div className="about-contacts">
          <span>
            <a
              href="mailto:amirsuhov@gmail.com"
              target="_blank">
              <img
                src={MailIcon}
                alt="Mail Icon"
              />
              amirsuhov@gmail.com
            </a>
          </span>
          <span>
            <a
              href="tel:+998900052540"
              target="_blank">
              <img
                src={PhoneIcon}
                alt="Phone Icon"
              />
              +998 90 005 25 40
            </a>
          </span>
          <span>
            <a
              href="https://t.me/NEXIT"
              target="_blank">
              <img
                src={TgIcon}
                alt="Telegram Icon"
              />
              @N_EXIT
            </a>
          </span>
        </div>
      </div>
      <img
        className="about-image"
        src={myImg}
        alt="My photo"
      />
    </div>
  );
};

export default About;
