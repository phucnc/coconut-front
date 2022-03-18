import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
// import { Productcard, ProductProps } from 'components/organisms/productCard';
import { ProductcardMyItem, ProductProps } from 'components/organisms/productCardMyItem';
import { ProfileCard, ProfileProps } from 'components/organisms/profileCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from 'components/atoms/spinner';
import { Text } from 'components/atoms/text';
import { Icon } from 'components/atoms/icon';
import { Button } from 'components/atoms/button';

interface Props {
  list: (ProductProps | ProfileProps)[];
  next?: () => void;
  next_cursor?: string;
  searchBy?: string;
  option?: any;
  // isLoading: boolean;
}

export const ItemListMyItem: React.FC<Props> = props => {
  const [isShowMore, setIsShowMore] = useState(false);

  useEffect(() => setIsShowMore(false), [props.searchBy]);
  return (
    <div className="o-itemlist">
      {/* {props.isLoading ? (
        <Spinner modifiers="big" />
      ) : ( */}
        <>
          <InfiniteScroll
            dataLength={props.list.length}
            hasMore={isShowMore && !!props.next_cursor}
            next={props.next}
            loader={<Spinner modifiers="big" />}
          >
            {props.list.length ? (
              <div className="o-itemlistMyitem_wrapper">
                {props.list.map((item, idx) => (
                  <div key={idx} className="o-itemlistMyitem_item">
                    {(item as ProductProps).title ? (
                      <ProductcardMyItem {...(item as ProductProps)}></ProductcardMyItem>
                    ) : (
                      <ProfileCard {...(item as ProfileProps)}></ProfileCard>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="o-itemlist_noresult">
                <Icon iconName="search-not-found" />
                <Text size="28" modifiers={['blue']}>
                  Oops!
                </Text>
                <Text size="24" modifiers={['blue']}>
                  No matching search results.
                </Text>
              </div>
            )}
          </InfiniteScroll>
          {/* {!isShowMore && props.next_cursor && props.list.length >12 && <Button modifiers={['more']} handleClick={() => {setIsShowMore(true);scroll(0, 700);scroll({
  top: 1000,
  behavior: 'smooth'
})}}>See more</Button>} */}
        </>
      {/* // )
      } */}
    </div>
  );
};

export default hot(ItemListMyItem);
