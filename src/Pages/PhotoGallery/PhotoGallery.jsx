import update from "immutability-helper";
import { useState } from "react";
import LayOutImages from "../../Components/LayoutImages/LayOutImages";
import "./PhotoGallery.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import img1 from '../../images/image-1.webp';
import img2 from '../../images/image-2.webp';
import img3 from '../../images/image-3.webp';
import img4 from '../../images/image-4.webp';
import img5 from '../../images/image-5.webp';
import img6 from '../../images/image-6.webp';
import img7 from '../../images/image-7.webp';
import img8 from '../../images/image-8.webp';
import img9 from '../../images/image-9.webp';
import img10 from '../../images/image-10.jpeg';
import img11 from '../../images/image-11.jpeg';
import img12 from '../../images/image-12.webp';
import img13 from '../../images/image-13.jpg';
import img14 from '../../images/image-14.webp';
import img15 from '../../images/image-15.jpg';
import img16 from '../../images/image-16.jpg';
import addImages from '../../images/addImage.png';

const PhotoGallery = () => {
  const images = [
    {
      id: 1,
      name: img1,
    },
    {
      id: 2,
      name: img2,
    },
    {
      id: 3,
      name: img3,
    },
    {
      id: 4,
      name: img4,
    },
    {
      id: 5,
      name: img5,
    },
    {
      id: 6,
      name: img6,
    },
    {
      id: 7,
      name: img7,
    },
    {
      id: 8,
      name: img8,
    },
    {
      id: 9,
      name: img9,
    },
    {
      id: 10,
      name: img10,
    },
    {
      id: 11,
      name: img11,
    },
    {
      id: 12,
      name: img12,
    },
    {
      id: 13,
      name: img13,
    },
    {
      id: 14,
      name: img14,
    },
    {
      id: 15,
      name: img15,
    },
    {
      id: 16,
      name: img16,
    }
    
  ];
  const [state, setState] = useState({
    count: 0,
    selected: [],
    allImage: images,
    addImages: [],
  });

  const { count, allImage, selected } = state;

  const handelDelete = () => {
    const commonIds = allImage
      .filter((objA) => selected.some((objB) => objB === objA.id))
      .map((obj) => obj.id);

    const newArray = [...allImage].filter((obj) => !commonIds.includes(obj.id));

    setState({
      ...state,
      count: 0,
      selected: [],
      allImage: newArray,
    });
  };

  // console.log(state);

  const moveGrid = (dragIndex, hoverIndex) => {
    const dragCard = allImage[dragIndex];
    setState(
      update(state, {
        allImage: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        },
      })
    );
  };

  const handelImageUpload = (e) => {
    const newImage = {
      id: allImage.length + 1,
      name: URL.createObjectURL(e.target.files[0]),
    };
    setState({
      ...state,
      allImage: [...allImage, newImage],
    });
  };

  return (
    <div className="photo-gallery">
      {/* photo gallery header section */}
      <div className="gallery-header">
        {count > 0 ? (
          <>
            <h3>
              <input type="checkbox" defaultChecked={true} /> {count} File
              Selected
            </h3>
            <p className="delete-file" onClick={handelDelete}>
              Delete files
            </p>
          </>
        ) : (
          <>
            <h3>Gallery</h3>
          </>
        )}
      </div>
      {/* photo gallery body section */}
      <DndProvider backend={HTML5Backend}>
        <div className="image-grid">
          {allImage.map((image, index) => (
            <LayOutImages
              key={index}
              image={image}
              index={index}
              state={state}
              handelSet={setState}
              moveGrid={moveGrid}
            />
          ))}
          <div
            style={{
              border: "2px dotted gray",
              borderRadius: "5px",
              position: "relative",
            }}
          >
            <img src={addImages} alt="addImage" />
            <input
              className="file-upload"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handelImageUpload}
            />
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default PhotoGallery;
