import React, { useRef,useEffect, useLayoutEffect, useState }  from 'react';
import { hot } from 'react-hot-loader/root';
import { mapModifiers } from 'lib/component';
import { Text } from 'components/atoms/text';
import { Button } from 'components/atoms/button';
import { useDropzone } from 'react-dropzone';
import { useFormikContext } from 'formik';
import { Image } from 'components/atoms/image';
import { useTranslation } from "react-i18next";
import cloud from 'assets/images/icon/icon-cloud.svg';

type Modifier = 'foo' | 'bar';

interface Props {
  modifiers?: Modifier | Modifier[];
  name: string;
  label: string;
  maxsize: string;
  setTouched?: () => void;
}

export const FileInputcreate: React.FC<Props> = props => {
  const { setFieldValue, setErrors, errors } = useFormikContext();
  const { t } = useTranslation();
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width:0, height: 0 });

  
  useEffect(() => {
    console.log("targetRef",targetRef.target)
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }
  }, []);
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: '.png, .gif, .webp, .mp4, .mp3',
    noClick: true,
    noKeyboard: true,
    
    maxSize: 100000000,
    onDrop: acceptedFiles => {
      props.setTouched && props.setTouched();
      console.log("acceptedFiles",acceptedFiles)
      acceptedFiles.length && setFieldValue(props.name, acceptedFiles[0]);
    },
    onDropRejected: fileRejections => {
      console.log("fileRejections",fileRejections)
      const rep = /File is larger than 100000000 bytes/gi;
      const rep1 = t("create.oversize")
      const errorMessage =
        fileRejections[0]?.errors[0]?.message.replace(rep, rep1);
      // const errorMessage =
      //   fileRejections[0]?.errors[0]?.message.replace(/ \d+ /, ' 100 ').replace(' bytes', 'mb') ||
      //   'Invalid File Format.';
      setErrors({ ...errors, [props.name]: errorMessage });
    },
  });
console.log('dimensions',dimensions)
  return (
    <div className={mapModifiers('a-fileinputcreatt', props.modifiers)} {...getRootProps()}>
      <Image src={cloud} alt="drag and drop" />
      <div className="a-fileinputcreatt_handle">
        <Text modifiers="gray"> {t("create.drag")}</Text>
        <Button handleClick={open} modifiers={["asLink","marginbottom"]}>
        {t("create.choosefile")}
        </Button>
      </div>
      <input ref={targetRef} id="fileButton" {...getInputProps()} className="a-fileinputcreatte_input" name={props.name} type="file" />
      <Text modifiers={["gray","noMargin"]}>{props.label}</Text>
      <Text modifiers="gray">{props.maxsize}</Text>
    </div>
  );
};

export default hot(FileInputcreate);
