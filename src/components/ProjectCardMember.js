import React from "react";
import styled from "styled-components";
import { getInitials } from "../utils";

const ProjectCardMemberStyled = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--grey);
  color: var(--white);
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function ProjectCardMember({ member }) {
  const { name, photo } = member;

  const initials = getInitials(name);

  return (
    <ProjectCardMemberStyled>
      {photo !== "" ? <img src={photo} alt="" /> : <span>{initials}</span>}
    </ProjectCardMemberStyled>
  );
}
