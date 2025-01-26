import React from "react";
import { Channel } from "@/entities/channel";
import { PageTitle } from "../style";
import { Grid } from "@/shared/ui";

export const Home: React.FC = () => {
  return (
    <>
      <PageTitle>Каталог Telegram-Каналов</PageTitle>

      <Grid $column={2}>
        <Channel
          id={0}
          img="/img.jpg"
          name={"Телеблог Нижний Новгород"}
          description={"За рекламой и предложениями обращаться Telegram"}
          link={"Astaniaki"}
          followers={1000}
        />
        <Channel
          id={0}
          img="/img.jpg"
          name={"Телеблог Нижний Новгород"}
          description={"За рекламой и предложениями обращаться Telegram"}
          link={"Astaniaki"}
          followers={1000}
        />
        <Channel
          id={0}
          img="/img.jpg"
          name={"Телеблог Нижний Новгород"}
          description={"За рекламой и предложениями обращаться Telegram"}
          link={"Astaniaki"}
          followers={1000}
        />
        <Channel
          id={0}
          img="/img.jpg"
          name={"Телеблог Нижний Новгород"}
          description={"За рекламой и предложениями обращаться Telegram"}
          link={"Astaniaki"}
          followers={1000}
        />
        <Channel
          id={0}
          img="/img.jpg"
          name={"Телеблог Нижний Новгород"}
          description={"За рекламой и предложениями обращаться Telegram"}
          link={"Astaniaki"}
          followers={1000}
        />
        <Channel
          id={0}
          img="/img.jpg"
          name={"Телеблог Нижний Новгород"}
          description={"За рекламой и предложениями обращаться Telegram"}
          link={"Astaniaki"}
          followers={1000}
        />
      </Grid>
    </>
  );
};

export default Home;
