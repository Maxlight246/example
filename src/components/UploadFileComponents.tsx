import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Attachment} from '../models/TaskModel';
import {DocumentCloud} from 'iconsax-react-native';
import {colors} from '../constants/colors';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import TextComponents from './TextComponents';
import {globalStyles} from '../styles/globalStyles';
import TitleComponents from './TitleComponents';
import SpaceComponents from './SpaceComponents';
import {calcFileSize} from '../utils/calcFileSize';
import {Slider} from '@miblanchard/react-native-slider';
import {G} from 'react-native-svg';

interface Props {
  onUpload: (file: Attachment) => void;
}

const UploadFileComponents = (props: Props) => {
  const {onUpload} = props;
  const [file, setFile] = useState<DocumentPickerResponse[]>([]);
  const [isVisiable, setIsVisiable] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);
  const [attachmentFile, setAttachmentFile] = useState<Attachment>();

  useEffect(() => {
    file.length > 0 && handleUploadFileToStorage();
  }, [file]);

  useEffect(() => {
    if (attachmentFile) {
      onUpload(attachmentFile);
      setIsVisiable(false);
    }
  }, [attachmentFile]);

  const handleDocumentPicker = () => {
    DocumentPicker.pick({copyTo: 'cachesDirectory'})
      .then(res => {
        setFile(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUploadFileToStorage = () => {
    if (file) {
      setIsVisiable(true);
      const path = `documents/${file[0].name}`;

      const res = storage()
        .ref(path)
        .putFile(file[0].fileCopyUri ?? '');

      res.on('state_changed', taskSnapshot => {
        setProgressUpload(
          taskSnapshot.bytesTransferred / taskSnapshot.totalBytes,
        );
      });

      res.then(() => {
        storage()
          .ref(path)
          .getDownloadURL()
          .then(url => {
            const data: Attachment = {
              name: file[0].name ?? '',
              url,
              size: file[0].size ?? 0,
            };
            setAttachmentFile(data);
          });
      });

      res.catch(err => console.log(err));
    }
  };

  return (
    <>
      <TouchableOpacity onPress={handleDocumentPicker}>
        <DocumentCloud size={24} color={colors.white} />
      </TouchableOpacity>
      <Modal
        visible={isVisiable}
        animationType="slide"
        style={{flex: 1}}
        transparent>
        <View
          style={[
            globalStyles.container,
            {
              backgroundColor: `${colors.gray2}80`,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <View
            style={{
              width: Dimensions.get('window').width * 0.8,
              height: 'auto',
              padding: 12,
              backgroundColor: colors.white,
              borderRadius: 12,
            }}>
            <TitleComponents text="Uploading" color={colors.bgColor} />
            <SpaceComponents height={20} />
            <View>
              <TextComponents
                color={colors.bgColor}
                text={file[0]?.name ?? ''}
                flex={0}
              />
              <TextComponents
                color={colors.gray2}
                text={`${calcFileSize(file[0]?.size as number)}` ?? ''}
                size={12}
                flex={0}
              />
            </View>
            <Slider
              value={progressUpload}
              renderThumbComponent={() => null}
              trackStyle={{
                height: 6,
                borderRadius: 100,
              }}
              minimumTrackTintColor={colors.success}
              maximumTrackTintColor={colors.desc}
            />
            <TextComponents
              text={`${Math.floor(progressUpload * 100)}%`}
              color={colors.bgColor}
              flex={0}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default UploadFileComponents;

const styles = StyleSheet.create({});
