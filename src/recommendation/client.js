// For the default version
import algoliasearch from 'algoliasearch';



const client = algoliasearch('RSBCBF0EG8', 'e740caae53c72e09463a1117854491d5');
const index = client.initIndex('yoursclothing_demo_price');

export { index };