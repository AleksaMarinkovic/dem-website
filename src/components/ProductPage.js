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
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { NavHashLink } from "react-router-hash-link";

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

  const [settingsOtherProducts, setSettingsOtherProducts] = useState({
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          arrows: true,
          vertical: false,
          verticalSwiping: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          arrows: true,
          vertical: false,
          verticalSwiping: false,
        },
      },
    ],
  });

  const [otherProducts, setOtherProducts] = useState([]);
  const [product, setProduct] = useState();
  const [album, setAlbum] = useState();
  const [fetchedProduct, setFetchedProduct] = useState(false);
  const [fetchedAlbum, setFetchedAlbum] = useState(false);
  const [fetchedOtherProducts, setFetchedOtherProducts] = useState(false);
  const [fetchErrorProduct, setFetchErrorProduct] = useState();
  const [fetchErrorAlbum, setFetchErrorAlbum] = useState();
  const [isBusyOtherProducts, setIsBusyOtherProducts] = useState(true);
  const [showOtherProducts, setShowOtherProducts] = useState(false);

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
    if (fetchedProduct) {
      async function fetchOtherProducts() {
        await Axios.post("getProductsByFilter", {
          filter: {
            productCategory: product.productCategory,
          },
        })
          .then((response) => {
            if (response.data.success) {
              if (response.data.data.length > 1) {
                setShowOtherProducts(true);
                setSettingsOtherProducts({
                  ...settingsOtherProducts,
                  slidesToShow: Math.min(3, response.data.data.length - 1),
                });
                console.log(settingsOtherProducts)
                setOtherProducts(
                  response.data.data.filter((item) => {
                    return item._id !== product._id;
                  })
                );
              }
              setFetchedOtherProducts();
              setIsBusyOtherProducts(false);
            }
          })
          .catch((error) => {
            if (error.response) {
              setFetchedOtherProducts(error.response.data.message);
            } else if (error.request) {
              setFetchedOtherProducts("Error 003");
            } else {
              setFetchedOtherProducts("Error 004");
            }
          });
      }
      fetchOtherProducts();
    }
  }, [fetchedProduct]);

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
      <div id="top" className="top-anchor" />
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
                  <div className="productpage-productname">
                    {product.productName}
                  </div>
                  <div className="productpage-image-wrapper">
                    <img
                      src={product.productImageUrl}
                      alt={product.productName}
                      className="productpage-image"
                      draggable="false"
                    ></img>
                  </div>
                  {fetchedAlbum && (
                    <div>
                      <div className="container-carousel-product">
                        <Slider {...settings}>
                          {album.map((item) => {
                            return (
                              <div className="carousel-album-image-wrapper">
                                <Zoom>
                                  <img
                                    src={item}
                                    alt={item}
                                    className="carousel-album-image"
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
                  <ReactMarkdown>{product.productDescription}</ReactMarkdown>
                </div>
              </div>
            </div>
            {!isBusyOtherProducts ? (
              <div className="sidebar"
              >
                {showOtherProducts && (
                  <div className="sidebar-inner">
                    <div className="carousel-header">SLIČNI PROIZVODI</div>
                    <div className="container-carousel-other-products">
                      <Slider {...settingsOtherProducts}>
                        {otherProducts.map((item) => {
                          return (
                            <div className="carousel-item-wrapper">
                              <div className="carousel-item-header">
                                {item.productName}
                              </div>
                              <NavHashLink
                                smooth
                                to={"/products/" + item._id + "/#top"}
                                title="Kliknite da otvorite stranicu proizvoda"
                                className="carousel-products-image-wrapper"
                              >
                                <img
                                  src={item.productImageUrl}
                                  alt={item.productName}
                                  className="carousel-image"
                                ></img>
                              </NavHashLink>
                            </div>
                          );
                        })}
                      </Slider>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <LoadingSpinner></LoadingSpinner>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductPage;
