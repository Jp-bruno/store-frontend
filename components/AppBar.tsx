import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const StyledAppBar = styled.div`
  background-color: #444;
  padding: 0;
  padding-inline: 100px;

  .nav-ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    width: 100%;
    align-items: stretch;

    & li {
      display: flex;

      & a,
      & button {
        display: flex;
        align-items: center;
        padding: 20px;
        cursor: pointer;
      }
    }

    .login-li {
      margin-left: auto;
    }

    .nav-link {
      &.is-current-page {
        background-color: #555;
      }

      &:hover {
        background-color: #666;
      }
    }
  }
`;

export default function AppBar() {
  const { pathname } = useRouter();
  const { isAuth, setAuth } = useContext(AuthContext);

  if (isAuth) {
    return (
      <StyledAppBar>
        <nav>
          <ul className="nav-ul">
            <li>
              <Link
                href="/"
                className={`nav-link ${pathname === "/" ? "is-current-page" : ""}`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="#"
                className="nav-link"
                onClick={(ev) => {
                  ev.preventDefault();
                  console.log("ok");
                }}
              >
                Cart
              </Link>
            </li>

            <li className="login-li">
              <button onClick={() => setAuth(false)}>Logoff</button>
            </li>
          </ul>
        </nav>
      </StyledAppBar>
    );
  }

  return (
    <StyledAppBar>
      <nav>
        <ul className="nav-ul">
          <li>
            <Link
              href="/"
              className={`nav-link ${pathname === "/" ? "is-current-page" : ""}`}
            >
              Home
            </Link>
          </li>

          <li className="login-li">
            <Link
              href="/login"
              className={`nav-link ${pathname === "/login" ? "is-current-page" : ""}`}
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </StyledAppBar>
  );
}
