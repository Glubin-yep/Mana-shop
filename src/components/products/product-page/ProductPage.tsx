import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Loader from 'components/Loader/Loader.tsx'
import { productService } from 'services/ProductService.ts'
import { ProductDetails } from 'types/ProductDetails.ts'
import ProductDetailsComponent from 'components/products/product-page/ProductDetails.tsx'
import Button from 'components/buttons/Button.tsx'
import { IoCartOutline } from 'react-icons/io5'
import styles from '../ProductCard.module.scss'
import { FaStar } from 'react-icons/fa'
import { convertPrice } from 'utils/convertPrice.ts'
import DeliveryInfo from 'components/DeliveryInfo/DeliveryInfo.tsx'
import Error404 from 'components/ErrorPages/Error404/Error404.tsx'
import { useCart } from 'react-use-cart'

function ProductPage() {
	const { id } = useParams<{ id: string }>()
	const productId = id ? parseInt(id, 10) : undefined
	const { addItem } = useCart()

	const { data: product, status } = useQuery<ProductDetails>({
		queryKey: ['product', id],
		queryFn: () =>
			productId
				? productService.getProductByID(productId)
				: Promise.reject('Happened something bad!'),
		enabled: !!productId
	})
	if (status === 'pending') return <Loader />
	if (status === 'error') return <Error404 />
	if (!product) return <Error404 />

	const handleAddToCart = () => {
		addItem({
			id: product.id,
			name: product.name,
			price: +product.price,
			image: product.photoURL
		})
	}

	return (
		<section className={styles.productPage}>
			<div className={styles.imageWrap}>
				<img src={product.photoURL} alt='product-image' />
			</div>
			<div>
				<h1 className={styles.title}>{product.name}</h1>
				<p className={styles.brand}>
					{product.brand} - {product.category}
				</p>
				<p className={styles.rating}>
					<FaStar size={20} style={{ color: 'goldenrod' }} />
					{product.rating}
				</p>
				<p className={styles.productPrice}>
					{convertPrice(product.price)}
					<span>₴</span>
				</p>
				<hr />
				<h1 className={styles.detailsTitle}>Характеристики:</h1>
				<ProductDetailsComponent product={product} />
				<hr />
				<Button
					type='button'
					className='flex items-center gap-2 m-auto'
					onClick={handleAddToCart}
				>
					<IoCartOutline size={25} />
					Додати в корзину
				</Button>
				<DeliveryInfo />
			</div>
		</section>
	)
}

export default ProductPage
