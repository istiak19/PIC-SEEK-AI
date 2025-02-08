import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";

const SingleImage = () => {
    const { id } = useParams();
    const { data: image } = useQuery({
        queryKey: ['imageAi'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/api/v1/image/all/${id}`)
            return res.data;
        }
    });

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img
                    src={image.imageUrl}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {image.userName}
                </h2>
            </div>
        </div>
    );
};

export default SingleImage;