import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { MouseEvent, useContext } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";
import useGetAllUsersData from "../hooks/useAllUsersData";
import Router, { useRouter } from "next/router";

const StyledMain = styled.main`
  padding: 100px;
  display: flex;

  & form {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    border: solid 1px #555555;
    flex-grow: 2;

    & h2 {
      text-align: center;
    }

    & input {
      padding: 15px;
    }

    & button {
      padding: 10px;
    }

    & input,
    & button {
      margin-inline: auto;
      width: 30%;
    }
  }

  .users-list-div {
    border: solid 1px #555555;
    padding: 10px;
    width: auto;

    & ul {
      display: flex;
      flex-direction: column;
      row-gap: 10px;

      & li {
        padding: 4px;
        &:hover {
          background-color: #dddddd;
          color: black;
          cursor: pointer;
        }
      }
    }
  }
`;

export default function Login() {
  const { setAuth, setUserData } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const allUsers = useGetAllUsersData();
  const router = useRouter();

  function submitData(data: FieldValues) {
    const theUser = allUsers.find(
      (user) => (user.email === data.email) && (user.password === data.password)
    );

    if (theUser === undefined) {
      alert("Invalid data");

      return;
    }

    setUserData({
      email: theUser?.email || "",
      name: theUser?.name.firstname + " " + theUser?.name.lastname,
    });

    setAuth(true);

    router.push('/')

    return;
  }

  function autoFillForm(ev:MouseEvent<HTMLLIElement>) {
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
    const passwordInput = document.querySelector('input[type="password"]')  as HTMLInputElement;

    emailInput.value = ev.currentTarget.children[0].textContent as string;
    passwordInput.value = ev.currentTarget.children[2].textContent as string;

    //had to focus here so react hook form can get the inputs values
    emailInput.focus();
    passwordInput.focus();
  }

  return (
    <StyledMain>
      <div className="users-list-div">
        <h3>Available fake users</h3>
        <ul>
          {allUsers ? (
            allUsers.map((user) => (
              <li
                key={Math.random() * 2000}
                onClick={autoFillForm}
              >
                <span>{user.email}</span> 
                <br /> 
                <span>{user.password}</span>
              </li>
            ))
          ) : (
            <div style={{display: 'grid', placeItems: 'center'}}>
              <Oval />
            </div>
          )}
        </ul>
      </div>

      <form onSubmit={handleSubmit((data) => submitData(data))}>
        <h2>Welcome</h2>
        <input
          type="email"
          placeholder="E-mail"
          required
          {...register("email")}
        />

        <input
          type="password"
          placeholder="Password"
          required
          {...register("password")}
        />

        <button>Login</button>
      </form>
    </StyledMain>
  );
}
