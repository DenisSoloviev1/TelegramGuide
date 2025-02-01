import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftSvg, CustomButton, Grid } from "@/shared/ui";
import { Channel, IChannel } from "@/entities/channel";

const Search: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const channels = location.state?.channels || [];

  return (
    <>
      <CustomButton onClick={() => navigate(-1)}>
        <ArrowLeftSvg />
      </CustomButton>

      <Grid $column={1} $gap={20}>
        {channels.map((channel: IChannel) => (
          <Channel key={channel.id} {...channel} />
        ))}
      </Grid>
    </>
  );
};

export default Search;
