import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Transition } from "react-transition-group";
import MemberAvatar from "../MemberAvatar";
import DescriptionBox from "../DescriptionBox";
import { parseDate } from "../../utils";
import { useOvermind } from "../../store";
import Member from "../Member";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const duration = 200;
const defaultStyle = {
  transition: `right ${duration}ms ease-in-out`,
  right: "-377px",
};

const transitionStyles = {
  entering: { right: "-377px" },
  entered: { right: "0px" },
};

const ProjectSlideMenuStyled = styled.div`
  height: 100%;
  width: 377px;
  overflow: auto;
  background: var(--white);
  position: absolute;
  right: 0px;
  top: 0px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
  z-index: 100;
  .header {
    width: 100%100%;
    height: 50px;
    border-bottom: 1px solid var(--grey);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header-name {
      text-transform: capitalize;
    }
    .material-icons {
      cursor: pointer;
    }
  }

  .created-by {
    width: 100%;
    .created-by-label {
      font-size: 0.6rem;
      color: var(--textGrey);
      display: flex;
      align-items: center;
      margin: 13px 0px;
      .material-icons {
        font-size: 1rem;
        margin-right: 5px;
      }
    }
  }

  .created-by-profile {
    display: flex;
    align-items: center;
    gap: 10px;
    .created-by-name-date {
      display: flex;
      flex-direction: column;
      .created-by-name {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 0.8rem;
        color: var(--textDark);
      }
      .created-by-date {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 0.7rem;
        color: var(--textGrey);
      }
    }
  }

  .members {
    .members-label {
      font-size: 0.6rem;
      color: var(--textGrey);
      display: flex;
      align-items: center;
      margin: 13px 0px;
      .material-icons {
        font-size: 1rem;
        margin-right: 5px;
      }
    }

    .member {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.8rem;
      color: var(--textDark);

      .remove-btn {
        background: var(--white);
        width: 63px;
        height: 24px;
        border: 1px solid #eb5757;
        color: #eb5757;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.6rem;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        &:hover {
          background: #eb5757;
          color: #fff;
        }
      }
      .admin-btn {
        width: 63px;
        height: 24px;
        border: none;
        color: var(--textGrey);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

export default function ProjectSlideMenu({ project, show, toggleMenu }) {
  const {
    actions: { projects: projectsActions },
    state: { user: userState },
  } = useOvermind();

  const ref = useRef(null);

  let closeMenu = () => {
    toggleMenu();
  };

  useOutsideClick(ref, closeMenu);

  const [loading, setLoading] = useState(false);

  function descriptionUpdateHandler(val) {
    console.log(val);
    projectsActions.updateProject({
      updatedProps: {
        description: val,
      },
      cb: (code) => {
        if (code) {
          console.log("some error happened");
          return;
        }
        console.log("Update successful");
      },
    });
  }

  function removeMember(id) {
    let newMembers = project.members.filter((member) => member._id !== id);
    projectsActions.updateProject({
      updatedProps: {
        members: newMembers,
      },
      cb: (code) => {
        if (code) {
          console.log("some error happened");
          return;
        }
        console.log("Update successful");
      },
    });
  }

  return (
    <Transition in={show} timeout={duration} unmountOnExit>
      {(state) => (
        <ProjectSlideMenuStyled
          style={{ ...defaultStyle, ...transitionStyles[state] }}
          ref={ref}
        >
          <div className="header">
            <span className="header-name">{project.name}</span>
            <span onClick={toggleMenu} className="material-icons">
              close
            </span>
          </div>

          <div className="created-by">
            <div className="created-by-label">
              <span className="material-icons">account_circle</span>
              <span>Made by</span>
            </div>
            <div className="created-by-profile">
              <MemberAvatar member={project.createdBy} />
              <div className="created-by-name-date">
                <span className="created-by-name">{project.createdBy.name}</span>
                <span className="created-by-date">
                  on {parseDate(project.createdAt)}
                </span>
              </div>
            </div>
          </div>

          <DescriptionBox
            description={project.description}
            onSave={descriptionUpdateHandler}
          />

          <div className="members">
            <div className="members-label">
              <span className="material-icons">group_work</span>
              <span>Team</span>
            </div>
            <div>
              <div className="member">
                <Member member={project.createdBy} />
                <span className="admin-btn">Admin</span>
              </div>
              {project.members.map((member) => (
                <div className="member" key={member._id}>
                  <Member member={member} />
                  {userState.user._id === project.createdBy._id && (
                    <button
                      onClick={() => removeMember(member._id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ProjectSlideMenuStyled>
      )}
    </Transition>
  );
}
