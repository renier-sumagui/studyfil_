import { useRouteError } from "react-router-dom";
import { ErrorPageCss } from 'stylesheets/error-page';

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={ErrorPageCss.errorPage}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
            <i>{error.statusText || error.message}</i>
        </p>
    </div>
  );
}