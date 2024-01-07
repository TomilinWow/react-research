
import { Link } from "react-router-dom";
import { IPhoto } from "../../types/photos";

export const PhotoCard = (props: IPhoto) => {
  const { url, title, id } = props


  return (
    <Link to={'/photo/' + id}>
      <div className="mt-2 flex justify-between w-80 rounded-md bg-blue-200 p-2 gap-2">
        <img width={120} height={120} src={url} alt={'post'}/>
        <p className="font-semibold text-gray-900">{title}</p>
      </div>
    </Link>
  )
}
