import { useQuery } from "@tanstack/react-query";
import PageTitle from "../components/shared/PageTitle";
import axios from "axios";
import { Link } from "react-router";

const Creations = () => {
    const { data: images } = useQuery({
        queryKey: ['imageAi'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/api/v1/image/all')
            return res.data;
        }
    })

    console.log(images);

    return (
        <div>
            <PageTitle>ALL Creations</PageTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    images?.map(img => (
                        <div key={img._id} className="card shadow-xl relative">
                            <figure>
                                <img
                                    src={img.imageUrl}
                                    alt="Generated Image"
                                    className="w-full h-60 object-cover"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {img.userName}
                                </h2>
                            </div>
                            <Link to={`/creations/${img._id}`} className="btn btn-accent absolute bottom-28 left-2">Details</Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Creations;