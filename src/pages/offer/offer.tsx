import { Helmet } from 'react-helmet-async';
import ReviewItem from '../../components/review-item/review-item';
// import OfferCard from '../../components/offer-card/offer-card';
import { TPreviewOffer, TPreviewOffers, TDetailOffer, TDetailOffers } from '../../types/offer';
import { useParams } from 'react-router-dom';
import Page404 from '../page404/page404';
import { capitalizeFirstLetter, getRatingPercentage } from '../../utils';
import ReviewForm from '../../components/review-form/review-form';
import { TReviews } from '../../types/review';
import ReviewsList from '../../components/reviews-list/reviews-list';

type TOfferProps = {
//   // offersCount: number;
  offers: TPreviewOffers,
  detailOffers: TDetailOffers
  reviews: TReviews
//   // authorizationStatus: AuthorizationStatus
};

// export default function Offer({offers}: OfferProps): JSX.Element {
//   const { id } = useParams();
//   console.log('Card id', id);
//   const activeOffer: TPreviewOffer | undefined = offers.find((offer: TPreviewOffer) => offer.id === id);
//   console.log('activeOffer', activeOffer);
//   // const activeOffer = offers.find((offer) => offer.id === id);

//   if (!activeOffer) {
//     return <Page404 />;
//   }

// export default function Offer(): JSX.Element {
export default function Offer({offers, detailOffers, reviews}: TOfferProps): JSX.Element {
  const { id } = useParams();
  const activeOffer:TDetailOffer | undefined = detailOffers.find((offer: TDetailOffer) => offer.id === id);
  if (!activeOffer) {
    return <Page404 />;
  }

  const {images, title, isPremium, isFavorite, rating, type, bedrooms, maxAdults, price, goods, host, description} = activeOffer;

  const inFavoritesIcon = isFavorite ? 'offer__bookmark-button--active' : '';
  const inFavoritesText = isFavorite ? 'In bookmarks' : 'To bookmarks';
  const isHostProIcon = host.isPro ? 'offer__avatar-wrapper--pro' : '';
  const isHostProText = host.isPro ? 'Pro' : '';

  return (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>6 cities - Offer</title>
      </Helmet>
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {
              images.map((image, index) => {
                return (
                  <div className="offer__image-wrapper" key={index}>
                    <img className="offer__image" src={image} alt={title}/>
                  </div>
                )
              })
            }

            {/* <div className="offer__image-wrapper">
              <img className="offer__image" src="img/room.jpg" alt="Photo studio" />
            </div>
            <div className="offer__image-wrapper">
              <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
            </div>
            <div className="offer__image-wrapper">
              <img className="offer__image" src="img/apartment-02.jpg" alt="Photo studio" />
            </div>
            <div className="offer__image-wrapper">
              <img className="offer__image" src="img/apartment-03.jpg" alt="Photo studio" />
            </div>
            <div className="offer__image-wrapper">
              <img className="offer__image" src="img/studio-01.jpg" alt="Photo studio" />
            </div>
            <div className="offer__image-wrapper">
              <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
            </div> */}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {isPremium && <div className="offer__mark"><span>Premium</span></div>}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {title}
              </h1>
              <button className={`offer__bookmark-button ${inFavoritesIcon} button`} type="button">
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">{inFavoritesText}</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{width: getRatingPercentage(rating)}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
              {capitalizeFirstLetter(type)}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {maxAdults} adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {
                  goods.map((good, index) => {
                    return (
                      <li className="offer__inside-item" key={index}>
                        {good}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className={`offer__avatar-wrapper ${isHostProIcon} user__avatar-wrapper`}>
                  <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="offer__user-name">
                  {host.name}
                </span>
                <span className="offer__user-status">
                  {isHostProText}
                </span>
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {description}
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">reviews.length</span></h2>
              <ReviewsList reviews={reviews} />
              <ReviewForm />
            </section>
          </div>
        </div>
        <section className="offer__map map"></section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {/* <OfferCard />
            <OfferCard />
            <OfferCard /> */}
          </div>
        </section>
      </div>
    </main>
  );
}
