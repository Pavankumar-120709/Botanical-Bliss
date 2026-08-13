import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
      <footer className="flex justify-center py-4 items-center text-grey-700 dark:text-gray-300 gap-1.5 font-primary">
        Built with <FontAwesomeIcon icon={faHeart} className="text-red-600 ml-1 animate-pulse" aria-hidden="true"/>
          by
          <span className={"text-primary dark:text-light font-semibold px-1"}>Botanical Bliss</span>
      </footer>
  );
}