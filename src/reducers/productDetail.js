const initState = {
  product: {},
  showModal: null,
  recommendations: []
};

const productDetail = (state = initState, action) => {
  switch (action.type) {
    case "PRODUCT_DETAIL":
      return {
        ...state,
        product: action.payload,
      };
    case "SHOW_MODAL_PDP":
      return {
        ...state,
        showModal: action.payload,
      };
    case "SHOW_RECOMMENDATION":
      return {
        ...state,
        recommendations: action.payload,
      };
    default:
      return { ...state };
  }
};

export default productDetail;
