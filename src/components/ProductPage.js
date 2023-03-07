import Axios from "axios";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import LoadingSpinner from "./LoadingSpinner";

const ProductPage = () => {
  let { id } = useParams();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };
  const [product, setProduct] = useState();
  const [album, setAlbum] = useState();
  const [fetchedProduct, setFetchedProduct] = useState(false);
  const [fetchedAlbum, setFetchedAlbum] = useState(false);
  const [fetchErrorProduct, setFetchErrorProduct] = useState();
  const [fetchErrorAlbum, setFetchErrorAlbum] = useState();

  useEffect(() => {
    async function fetchDataProduct() {
      await Axios.post("/getProductById", {
        _id: id,
      })
        .then((response) => {
          if (response.data.success) {
            setProduct(response.data.data);
            setFetchedProduct(true);
          }
        })
        .catch((error) => {
          if (error.response) {
            // request made and server responded
            setProduct();
            setFetchErrorProduct(error.response.data.message);
          } else if (error.request) {
            // request made no response from server
            setProduct();
            setFetchErrorProduct("Error 003");
          } else {
            // request setup failed
            setFetchErrorProduct("Error 004");
            setProduct();
          }
        });
    }
    fetchDataProduct();
  }, []);

  useEffect(() => {
    async function fetchData() {
      Axios.post("/getAlbumByProductId", {
        productId: id,
      })
        .then((response) => {
          if (response.data.success) {
            setAlbum(response.data.data.albumImagesUrls);
            setFetchedAlbum(true);
          }
        })
        .catch((error) => {
          if (error.response) {
            // request made and server responded
            setFetchErrorAlbum(error.response.data.message);
            console.log(error.response.data.message);
          } else if (error.request) {
            // request made no response from server
            setFetchErrorAlbum("Error 003");
            console.log("Error 003");
          } else {
            // request setup failed
            setFetchErrorAlbum("Error 004");
            console.log("Error 004");
          }
        });
    }
    fetchData();
  }, []);

  return (
    <motion.div
      key="productsPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {!fetchedProduct && <LoadingSpinner />}
      {fetchErrorProduct ? (
        <div className="error-message">{fetchErrorProduct}</div>
      ) : (
        <div style={{ visibility: "hidden" }}></div>
      )}
      {fetchedProduct && (
        <div className="parent">
          <div className="productpage-main-horizontal-container">
            <div className="main">
              <div className="productpage-image-album-and-description-container">
                <div className="productpage-image-and-album-container">
                  <div className="productpage-productname">{product.productName}</div>
                  <div className="productpage-image-wrapper">
                    <img
                      src={product.productImageUrl}
                      alt={product.productName}
                      className="productpage-image"
                    ></img>
                  </div>
                  {fetchedAlbum && (
                    <div>
                      <div className="container-carousel-product">
                        <Slider {...settings}>
                          {album.map((item) => {
                            return (
                              <div>
                                <Zoom>
                                  <img
                                    src={item}
                                    alt={item}
                                    className="carousel-image"
                                  ></img>
                                </Zoom>
                              </div>
                            );
                          })}
                        </Slider>
                      </div>
                    </div>
                  )}
                </div>
                <div className="productpage-description-container">
                 {product.productDescription}
                </div>
              </div>
            </div>
            <div className="sidebar">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              hendrerit ut nibh vitae commodo. Aliquam in feugiat ligula, eu
              imperdiet eros. Proin pretium nibh rhoncus eros hendrerit iaculis.
              Proin bibendum maximus turpis, elementum rhoncus nisl elementum
              non. Mauris diam dui, iaculis nec finibus imperdiet, mattis eu
              tortor. Praesent sed velit purus. Vivamus pharetra, odio sit amet
              mollis venenatis, sapien sem vulputate nisl, sit amet ultrices
              tortor erat quis dui. Phasellus scelerisque odio urna, vitae
              consequat ipsum molestie ut. Praesent suscipit finibus diam,
              varius dapibus risus pellentesque eu.
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductPage;
