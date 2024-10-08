import styles from './Sidebar.module.scss'
import CategoryData from './Category.json'
import AddressIcon from '/catalog/pin.png'
import Instagram from '/catalog/instagram.png'
import Facebook from '/catalog/facebook.png'
import { Link, NavLink } from 'react-router-dom'
import { MdKeyboardArrowRight } from 'react-icons/md'
import cn from 'clsx'

function Sidebar() {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.sidebarContent}>
				<div className={styles.top}>
					{CategoryData.map(category => (
						<NavLink
							to={`/category/${category.category}`}
							className={({ isActive }) =>
								cn(styles.sidebarItem, isActive ? styles.sidebarItemActive : '')
							}
							key={category.id}
						>
							<img src={category.icon} alt='sidebar-item-icon' />
							<span>{category.title}</span>
							<MdKeyboardArrowRight className={styles.mobileItemIcon} />
						</NavLink>
					))}
				</div>
				<div className={styles.bottom}>
					<hr />
					<div className={styles.sidebarAddressItem}>
						<img src={AddressIcon} alt='address-icon' />
						<span>м. Тернопіль, Вулиця 20</span>
					</div>
					<hr />
					<div className={styles.socialMedia}>
						<h1>Ми в соціальних мережах</h1>
						<div>
							<Link to='https://instagram.com' target='_blank'>
								<img src={Instagram} alt='instagram-icon' />
							</Link>
							<Link to='https://facebook.com' target='_blank'>
								<img src={Facebook} alt='facebook-icon' />
							</Link>
						</div>
					</div>
					<hr />
					<div className={styles.additionalInfo}>
						<h1>Інформація про компанію</h1>
						<ul>
							<Link to='/about'>
								<li>Про нас</li>
							</Link>
							<Link to='/contacts'>
								<li>Контакти</li>
							</Link>
							<Link to='/service'>
								<li>Ремонт</li>
							</Link>
						</ul>
						<p>Умови використання сайту</p>
					</div>
				</div>
			</div>
		</aside>
	)
}

export default Sidebar
