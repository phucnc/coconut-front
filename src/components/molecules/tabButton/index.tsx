import React from 'react';
import { hot } from 'react-hot-loader/root';
import { mapModifiers } from 'lib/component';
import { Button } from 'components/atoms/button';
import { Text } from 'components/atoms/text';
import { Field } from 'formik';

type Modifier = 'foo' | 'bar' | 'explore' |'category' |'walletSwitch';

interface Props {
  modifiers?: Modifier | Modifier[];
  explore?: boolean;
  category?: boolean;
  active?: boolean;
  wallet?: boolean;
  handleClick?: () => void;
  useFormik?: boolean;
  value?: string;
  name?: string;
  // checked?:any;
}

export const TabButton: React.FC<Props> = props => {
  return props.useFormik ? (
    <label className={mapModifiers('m-tabbutton', props.modifiers)}>
      <Field type="radio" value={props.value} className="m-tabbutton_input" name={props.name} />
      <div className="m-tabbutton_indicator" onClick={props.handleClick}>
      { props.explore? (
        <Text modifiers={["centerexplore",'explore']} size="18">{props.children}</Text>
        ):props.wallet?(
          <Text modifiers={["centerexplore",'explore']} size="18">{props.children}</Text>
         ) : (
          <Text modifiers={["center"]} size="18">{props.children}</Text>
         )}
      </div>
    </label>
  ) : (
    <div className={mapModifiers('m-tabbutton', props.modifiers, props.active && 'active')}>
      {props.category? (
         <Button modifiers={['category']} handleClick={props.handleClick}>
         {/* <Text modifiers={props.active ? 'active' : void 0} size="12"> */}
         {/* <Text> */}
           #&nbsp;{props.children}
           {/* </Text> */}
         {/* </Text> */}
       </Button>
      ) : props.wallet ? (
        <Button modifiers={['walletSwitch']} handleClick={props.handleClick}>
          {props.children}
       </Button>
      ) : (
      <Button modifiers={['asText']} handleClick={props.handleClick}>
        <Text modifiers={props.active ? 'active' : void 0} size="18">
          {props.children}
        </Text>
      </Button>
      )}
    </div>
  );
};

export default hot(TabButton);
