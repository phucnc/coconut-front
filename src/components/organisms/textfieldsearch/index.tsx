import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { hot } from 'react-hot-loader/root';
import { mapModifiers } from 'lib/component';
import ReactModal from 'react-modal';
import Grid from '@material-ui/core/Grid';
import { navigate } from 'gatsby-link';
import { RouteComponentProps } from '@reach/router';
import {
  ExploreSchema,
  exploreSchema,
  ExtraProductCategories,
  ProductCategories,
  Sort,
  SortDefaultValue,
} from 'components/pages/explore/form';
import { TextFieldFormik } from 'components/atoms/textfield';
import { Text } from 'components/atoms/text';
import { Button } from 'components/atoms/button';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { Link } from 'gatsby';
type Modifier = 'overflowx' | 'overflowy' | 'overhidden' | 'error' | 'center';

interface Props {
  link?:string;
}


export const Textfieldsearch: React.FC<RouteComponentProps> = props => {
  // const [modalOpenShare, setModalOpenShare] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const params = new URLSearchParams(props.location?.search);
  const initialValue: ExploreSchema = useMemo(
    () => ({
      // unit: Unit[0],
      productCategory: params.get('category') || 'All',
      productSort: params.get('sort') || SortDefaultValue,
      verify: false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  
  return (
    
    <Formik initialValues={initialValue} validationSchema={exploreSchema} onSubmit={values => { 
      navigate(`/search?name=${values.search}`); }
  }>
      {({ values }) => {
        return (
          <Form>
 <TextFieldFormik
                                  modifiers="search"
                                  placeholder="Name"
                                  type="search"
                                  name="search"
                                />
                                </Form>
            );
          }}
        </Formik>
  
  ) 
};

export default hot(Textfieldsearch);
