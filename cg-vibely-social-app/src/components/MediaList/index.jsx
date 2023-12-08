import {useState} from "react";
import MediaDetails from "~/components/MediaDetails/index.jsx";
import "./index.css"

//type: tab, photos, post
function MediaList({images, type}) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
    const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(-1)
    const [showModal, setShowModal] = useState(false);

    const handleClick = (imageIndex, galleryIndex) => {
        setSelectedImageIndex(imageIndex);
        setSelectedGalleryIndex(galleryIndex);
        setShowModal(true);
    }

    const handleHide = () => {
        setSelectedImageIndex(-1);
        setSelectedGalleryIndex(-1);
        setShowModal(false);
    }

    let count = 0;
    let limit = 9;

    return (
        <div className="container-fluid row mx-0 px-0">

            {images.map((image, imageIndex) => {
                return (
                    image.gallery?.map((url, galleryIndex) => {
                        if (type === "photos" && count >= limit) {
                            return null;
                        }

                        count++;

                        return (
                            <div className={(type === 'tab' ? 'col-3' : 'col-lg-4 col-sm-3') + ' mb-3 pe-2'} key={galleryIndex}>
                                <img className="rounded-3 my-0 border border-1 border-gray shadow-md image-hover-effect"
                                     src={url}
                                     style={{
                                         objectFit: "cover",
                                         width: "100%",
                                         maxHeight: type === 'tab' ? 200 : 100,
                                         minHeight: type === 'tab' ? 200 : 100,
                                         cursor: "pointer"
                                     }}
                                     alt="picture"
                                     onClick={() => handleClick(imageIndex, galleryIndex)}
                                />
                            </div>
                        );
                    })
                );
            })}

            {showModal &&
                <MediaDetails
                    images={images}
                    currentImageIndex={selectedImageIndex}
                    currentGalleryIndex={selectedGalleryIndex}
                    onClose={handleHide}
                />}

        </div>
    )
}

export default MediaList;
