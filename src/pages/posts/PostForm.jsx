import { Breadcrumbs, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader, TextEditor } from "../../components";
import {
    formatImageUrl,
    getRequest,
    patchRequest,
    postRequest,
    showNotification,
    useUserAuthContext,
} from "../../utils";
import { useQuery } from "@tanstack/react-query";

const PostForm = () => {
    const { postID } = useParams();
    const { currentUser } = useUserAuthContext();
    const [coverImgURL, setCoverImgURL] = useState();
    const [coverImgFile, setCoverImgFile] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState("");
    const [displayLoader, setDisplayLoader] = useState(false);
    const [displayPreview, setDisplayPreview] = useState(false);
    const navigate = useNavigate();

    const { data: post, isLoading } = useQuery({
        queryKey: ["post", postID],
        queryFn: async () => {
            const res = await getRequest({
                endpoint: `/posts/${postID}`,
            });

            return res.data || null;
        },
    });

    useEffect(() => {
        if (post && currentUser?._id !== post?.mentor?._id) {
            showNotification({
                message: "You are not authorized to edit this post",
                icon: "error",
            });

            navigate("/");
        }
    }, [post, currentUser]);

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
            setCoverImgURL(post.coverImg);
        }
    }, [post]);

    const handleFileChange = (e) => {
        const imgFile = e.target.files[0];

        if (imgFile) {
            setCoverImgFile(imgFile);
            setCoverImgURL(URL.createObjectURL(imgFile));
            e.target.value = "";
        }
    };

    const handleAddAndUpdatePostOperations = async () => {
        if (!title || !content) {
            showNotification({
                message: "Title, Cover image and Content are required",
                title: "Error",
                icon: "error",
            });

            return;
        }

        if (!postID && !coverImgFile) {
            showNotification({
                message: "Cover image is required required",
                title: "Error",
                icon: "error",
            });

            return;
        }

        if (postID && !coverImgURL && !coverImgFile) {
            showNotification({
                message: "Cover imagecds is required",
                title: "Error",
                icon: "error",
            });

            return;
        }

        if (content.split("").length < 200) {
            showNotification({
                message: "Content should be at least 200 characters",
                title: "Error",
                icon: "error",
            });
            return;
        }

        const formData = new FormData();

        formData.append(
            "postDetails",
            JSON.stringify({ title, content, mentorID: currentUser?._id })
        );
        formData.append("coverImg", coverImgFile);

        setDisplayLoader(true);

        let res;

        if (postID) {
            res = await patchRequest({
                endpoint: `/posts/${postID}`,
                data: formData,
            });
        } else {
            res = await postRequest({
                endpoint: "/posts",
                data: formData,
            });
        }

        setDisplayLoader(false);

        if (res.ok) {
            if (!postID) {
                showNotification({
                    message: "Post added successfully",
                    title: "Success",
                    icon: "success",
                });

                setTitle("");
                setContent("");
                setCoverImgURL();
                setCoverImgFile();
                return;
            }

            showNotification({
                message: "Post is updated successfully",
                title: "Success",
                icon: "success",
            });

            navigate(`/profile/${currentUser._id}?tab=Posts`);

            return;
        }

        showNotification({
            message: res.message,
            title: "Error",
            icon: "error",
        });
    };

    return (
        <>
            {isLoading && <Loader />}
            <div className="bg-white p-6 rounded-lg px-2 md:px-5 py-5 md:pt-3">
                {postID ? (
                    <Breadcrumbs className="bg-white mb-4">
                        <Link to={`/profile/${currentUser?._id}`}> Profile</Link>
                        <Link to={`/profile/${currentUser?._id}?tab=Posts`}>Posts</Link>
                        <span>Edit</span>
                    </Breadcrumbs>
                ) : (
                    <Breadcrumbs className="bg-white mb-4">
                        <Link to="/posts">Posts</Link>
                        <span>New</span>
                    </Breadcrumbs>
                )}

                <div className="w-full lg:w-[80%] m-auto">
                    <div>
                        <button
                            className="flex items-center gap-x-3"
                            onClick={() => {
                                document.querySelector("#coverImgInputEl").click();
                            }}
                        >
                            <MdOutlinePhotoSizeSelectActual />
                            <p> Add Cover</p>
                        </button>

                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            id="coverImgInputEl"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* CoverImg Display */}
                    <textarea
                        className="my-5 text-3xl font-bold w-full  outline-none placeholder:text-black resize-none"
                        placeholder="Enter title......"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            e.target.style.height = "0";
                            e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                    />

                    {coverImgURL && (
                        <div className="relative">
                            <button
                                className="bg-white absolute right-2 top-2 py-2 px-3 rounded bg-opacity-80"
                                onClick={() => {
                                    setCoverImgURL();
                                    setCoverImgFile();
                                }}
                            >
                                <RxCross2 size={20} />
                            </button>

                            <img
                                src={
                                    coverImgURL.startsWith("blob:")
                                        ? coverImgURL
                                        : formatImageUrl(coverImgURL)
                                }
                                alt=""
                                className="w-full h-[400px] object-cover rounded-lg mb-8"
                            />
                        </div>
                    )}

                    {content && (
                        <>
                            {displayPreview && (
                                <div className="my-8 unreset">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: content }}
                                    ></div>
                                </div>
                            )}

                            <div>
                                {displayLoader ? (
                                    <Button className="mb-8 flex items-center gap-x-4 bg-gray-800">
                                        <Oval
                                            visible={true}
                                            height="20"
                                            width="20"
                                            color="white"
                                            ariaLabel="oval-loading"
                                            strokeWidth="5"
                                            secondaryColor="white"
                                        />
                                        <p>{!postID ? "Posting" : "Updating"}</p>
                                    </Button>
                                ) : (
                                    <div className="space-x-2 mb-8">
                                        <Button
                                            onClick={handleAddAndUpdatePostOperations}
                                            size="sm"
                                        >
                                            <p>{!postID ? "Post" : "Update Post"}</p>
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            size="sm"
                                            onClick={() =>
                                                setDisplayPreview(
                                                    (_prevValue) => !_prevValue
                                                )
                                            }
                                        >
                                            <p>
                                                {displayPreview ? "Hide" : "Show"} Preview
                                            </p>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    <div className="mb-5">
                        <TextEditor value={content} setValue={setContent} height={500} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostForm;
