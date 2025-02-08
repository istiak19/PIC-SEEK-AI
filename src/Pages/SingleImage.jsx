import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../provider/AuthProvider";

const SingleImage = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const { data: image } = useQuery({
        queryKey: ['imageAi'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/api/v1/image/all/${id}`)
            return res.data;
        }
    });
    const { data: comment } = useQuery({
        queryKey: ['comment'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/api/v1/comment/get-comment/${id}`)
            return res.data;
        }
    });

    const handleComment = async (e) => {
        e.preventDefault();
        const comment = e.target.comment.value;
        const dataInfo = {
            email: user?.email,
            prompt: image?.prompt,
            imageId: id,
            comment: comment
        }
        const res = await axios.post(
            'http://localhost:5000/api/v1/comment/create-comment',
            dataInfo,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(res.data)
    }

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img
                    src={image?.imageUrl}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {image?.userName}
                </h2>
                <p className="text-gray-400">Comment: {comment?.reply || 'N/A'}</p>
            </div>
            <div className="ml-6 p-5 rounded-lg shadow-lg w-96">
                <form onSubmit={handleComment} className="space-y-3">
                    <input
                        name="comment"
                        type="text"
                        placeholder="Write your comment..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 font-semibold py-2 rounded-lg transition-all duration-300"
                    >
                        Comment 💬
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SingleImage;