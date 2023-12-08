import React, {useState} from 'react';
import {Dialog} from 'primereact/dialog';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import './index.css';
import MediaPost from '~/components/MediaDetails/MediaPost/index.jsx';

function MediaDetails({images, currentImageIndex, currentGalleryIndex, onClose}) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(currentImageIndex);
    const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(currentGalleryIndex)

    const handleClose = () => {
        setSelectedImageIndex(-1);
        setSelectedGalleryIndex(-1);
        onClose();
    };

    const handlePrevImage = () => {
        if (selectedImageIndex > 0) {
            if (selectedGalleryIndex > 0) {
                setSelectedGalleryIndex((prev) => prev - 1);
            } else if (selectedGalleryIndex === 0) {
                setSelectedImageIndex((prev) => prev - 1);
                setSelectedGalleryIndex(images[selectedImageIndex].gallery.length - 1);
            }
        } else if (selectedImageIndex === 0) {
            if (selectedGalleryIndex > 0) {
                setSelectedGalleryIndex((prev) => prev - 1);
            } else if (selectedGalleryIndex === 0) {
                setSelectedImageIndex(images.length - 1);
                setSelectedGalleryIndex(images[selectedImageIndex].gallery.length - 1);
            }
        }

        // setSelectedImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
    };

    const handleNextImage = () => {
        if (selectedImageIndex < images.length - 1) {
            if (selectedGalleryIndex < images[selectedImageIndex].gallery.length - 1) {
                setSelectedGalleryIndex((prev) => prev + 1);
            } else if (selectedGalleryIndex === images[selectedImageIndex].gallery.length - 1) {
                setSelectedImageIndex((prev) => prev + 1);
                setSelectedGalleryIndex(0);
            }
        } else if (selectedImageIndex === images.length - 1) {
            if (selectedGalleryIndex < images[selectedImageIndex].gallery.length - 1) {
                setSelectedGalleryIndex((prev) => prev + 1);
            } else if (selectedGalleryIndex === images[selectedImageIndex].gallery.length - 1) {
                setSelectedImageIndex(0);
                setSelectedGalleryIndex(0);
            }
        }

        // setSelectedImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <Dialog
            visible={selectedImageIndex >= 0 && selectedGalleryIndex >= 0}
            onHide={handleClose}
            className="p-dialog"
            modal={true}
            draggable={false}
            resizable={false}
            position="left"
            footer={null}
            style={{width: '80vw', maxWidth: "calc(100vh-280px)"}}
        >
            <div className="modal-backdrop dialog-content-container">
                <div>
                    <button className="prev-button left-0" onClick={handlePrevImage}>
                        <span className="pi pi-chevron-left"></span>
                    </button>
                </div>
                <div className="image-container">
                    <img
                        className="modal-image"
                        src={images[selectedImageIndex].gallery[selectedGalleryIndex]}
                        alt="Picture"
                    />
                </div>
                <div>
                    <button className="close-button" onClick={handleClose}>
                        <span className="pi pi-times"></span>
                    </button>
                    <button className="next-button" onClick={handleNextImage}>
                        <span className="pi pi-chevron-right"></span>
                    </button>
                </div>
                <div>
                    <MediaPost
                        id={images[selectedImageIndex].id}
                    />
                </div>

                {/*<PostDetail/>*/}
            </div>
        </Dialog>


    );
}

export default MediaDetails;
