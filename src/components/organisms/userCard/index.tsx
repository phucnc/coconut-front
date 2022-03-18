import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { mapModifiers } from 'lib/component';
import { Heading } from 'components/molecules/heading';
import { Text } from 'components/atoms/text';
import { Image, ImageProps } from 'components/atoms/image';
import { Icon } from 'components/atoms/icon';
import { Link } from 'components/atoms/link';
import { Dropdown } from 'components/molecules/dropdown';
import { DropdownMenu, DropdownItem, DropDownItemGroup } from 'components/molecules/dropdownMenu';
import { UserAvatar } from 'components/molecules/userAvatar';
import { CheckInput } from 'components/atoms/checkInput';
import { UserType, VideoType, VideoTypes } from 'lib/constants';
import { Button } from 'components/atoms/button';
import { Video } from 'components/molecules/video';
import { Tooltip } from 'components/molecules/tooltip';

type Modifier = 'foo' | 'bar';

export type User = { src: string; alt: string; type: UserType; name: string };
export interface ProductProps extends Omit<ImageProps, 'modifiers'> {
  modifiers?: Modifier | Modifier[];
  title: string;
  price?: number;
  bidPrice?: string | number;
  userList?: User[];
  amount?: number;
  collection?: string;
  isPreview?: boolean;
  id?: string | number;
  mediaType?: 'gif' | 'png' | 'image' | VideoType;
  unit?: string;
}

export const Productcard: React.FC<ProductProps> = props => {
  const [like, setLike] = useState({ isLike: false, amount: props.amount });
  const productLink = `/view?id=${props.id}`;
  return (
    <article className={mapModifiers('o-productcard', props.modifiers, props.isPreview && 'preview')}>
      {props.isPreview ? (
        <ProductPreview {...props} />
      ) : (
        <>
          {/* <div className="o-productcard_control">
            <CheckInput
              iconName={like.isLike ? 'heart-active' : 'heart'}
              amount={like.amount}
              handleChange={() =>
                setLike({
                  isLike: !like.isLike,
                  amount: !like.isLike && typeof props.amount === 'number' ? props.amount + 1 : props.amount,
                })
              }
            />
            <div className="o-productcard_dropdown">
              <Dropdown
                trigger={
                  <Button modifiers="icon">
                    <Icon iconName="more" />
                  </Button>
                }
                id={`${props.title}`}
              >
                <DropdownMenu>
                  <DropDownItemGroup>
                    <DropdownItem>Purchase now</DropdownItem>
                    <DropdownItem>
                      <Link href="/#" modifiers="asText">
                        View on OpenSea
                      </Link>
                    </DropdownItem>
                    <DropdownItem>Report</DropdownItem>
                  </DropDownItemGroup>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div> */}
          <Link href={productLink}>
            <div className="o-productcard_media">
              {VideoTypes.includes(props.mediaType || '') ? (
                <Video src={props.src} />
              ) : (
                <Image src={props.src} alt={props.alt} />
              )}
            </div>
          </Link>
          <div className="o-productcard_info">
            <div className="o-productcard_heading">
              <div className="o-productcard_lead">
                <Link href={productLink}>
                  <Heading type="h4" title={props.title}>
                    {props.title}
                  </Heading>
                </Link>

                {/* <Text modifiers={['gray', 'bold']} size="12" inline>
                  {props.collection}
                </Text> */}
              </div>
            </div>
            <div className="o-productcard_bmp">
              <div className="o-productcard_price">
                <Text modifiers={['blue', 'bold']} inline unit={props.unit}>
                  {props.price}
                </Text>

                <Text modifiers={['gray']} size="14" inline>
                  1 of 1
                </Text>
              </div>
              {/* <ul className="o-productcard_userlist">
                {props.userList &&
                  props.userList.map((u, idx) => (
                    <li
                      key={idx}
                      className={`o-productcard_user o-productcard_user-${idx + 1}`}
                      data-tip={`${u.type}: ${u.name}`}
                    >
                      <UserAvatar {...u} modifiers="small" hasTick />
                    </li>
                  ))}
              </ul> */}
            </div>
            {/* <div className="o-productcard_bid">
              <p className="o-productcard_bidinfo">
                {props.bidPrice ? (
                  <>
                    <Text size="14" inline>
                      Highest bid
                    </Text>
                    <Text inline modifiers={['lightbold', 'blue']} size="14" unit="BMP">
                      {props.bidPrice}
                    </Text>
                  </>
                ) : (
                  <Link href="/#">
                    Place a bid <Icon iconName="bid" />
                  </Link>
                )}
              </p>
              <aside className="o-productcard_bidcontrol">
                <Dropdown
                  trigger={
                    <Button modifiers="icon">
                      <Icon iconName="more" />
                    </Button>
                  }
                  id={`${props.title}`}
                >
                  <DropdownMenu>
                    <DropDownItemGroup>
                      <DropdownItem>Purchase now</DropdownItem>
                      <DropdownItem>Place a bit</DropdownItem>
                      <DropdownItem>
                        <Link href="/#" modifiers="asText">
                          View on OpenSea
                        </Link>
                      </DropdownItem>
                      <DropdownItem>Report</DropdownItem>
                    </DropDownItemGroup>
                  </DropdownMenu>
                </Dropdown>
              </aside>
            </div> */}
          </div>
          <Tooltip />
        </>
      )}
    </article>
  );
};

const ProductPreview: React.FC<ProductProps> = props => {
  return (
    <>
      <div className="o-productcard_media">
        {(props.src &&
          (VideoTypes.includes(props.mediaType || '') ? (
            <Video key={props.src} src={props.src} />
          ) : (
            <Image src={props.src} alt={props.alt} />
          ))) || (
          <Text size="14" modifiers="lightgray">
            Media Review1
          </Text>
        )}
      </div>
      <div className="o-productcard_info">
        <div className="o-productcard_heading">
          <div className="o-productcard_lead">
            <Heading type="h4" title={props.title}>
              {props.title || (
                <Text size="14" inline modifiers="lightgray">
                  [Name]
                </Text>
              )}
            </Heading>
            <Text modifiers={['gray', 'bold']} size="12" inline>
              {props.collection}
            </Text>
          </div>
        </div>
        <div className="o-productcard_bmp">
          <div className="o-productcard_price">
            <Text modifiers={['blue', 'bold']} inline unit={props.unit}>
              {props.price}
            </Text>
            <Text modifiers={['gray']} size="14" inline>
              1 of 1
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default hot(Productcard);
