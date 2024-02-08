import { useEffect, useCallback, useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
// import { useResponsive } from 'src/hooks/use-responsive';

// import { useGetMail, useGetMails, useGetLabels } from 'src/api/mail';

import { _gcpCheckList, _adCheckList } from 'src/_mock/_complience';

// import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
// import { LoadingScreen } from 'src/components/loading-screen';

import MailNav from '../mail-nav';
import IdList from '../mail-list';
import MailHeader from '../mail-header';
import MailCompose from '../mail-compose';
import MailDetails from '../mail-details';


// ----------------------------------------------------------------------

// const LABEL_INDEX = 'inbox';

export default function MailView() {
  // const router = useRouter();

  const searchParams = useSearchParams();



  const [selectedId, setSelectedId] = useState('');
  
  const [selectedType, setSelectedType] = useState('');

  const [selectedCSP, setSelectedCSP] = useState('');

  const [selectedCompliance, selectedCompliances] = useState('');

  const [selectedDescription, setSelectedDescription] = useState('');


  // const selectedLabelId = searchParams.get('label') || LABEL_INDEX;

  // const selectedMailId = searchParams.get('id') || '';

  // const mdUp = useResponsive('up', 'md');

  const settings = useSettingsContext();

  const openNav = useBoolean();

  const openMail = useBoolean();

  // const openCompose = useBoolean();

  // const { labels, labelsLoading } = useGetLabels();
  // const [selectedId, setSelectedId] = useState('');

  // const { mails, mailsLoading, mailsError, mailsEmpty } = useGetMails(selectedLabelId);

  // const { mail, mailLoading, mailError } = useGetMail(selectedMailId);

  // const firstMailId = mails.allIds[0] || '';

  // const handleToggleCompose = useCallback(() => {
  //   if (openNav.value) {
  //     openNav.onFalse();
  //   }
  //   openCompose.onToggle();
  // }, [openCompose, openNav]);

  const handleClickCSP = (csp) => {
    const selectedTypeObj = _gcpCheckList.find((item) => item.csp === csp.target.value);
    console.log('Selected CSP:', csp.target.value);
    console.log(selectedTypeObj);

    if (selectedTypeObj) {
      setSelectedCSP(selectedTypeObj.csp);
      console.log('Selected CSP:', selectedTypeObj.csp);
      // console.log('Selected ID: ', selectedTypeObj.id);
    }
    // 전체를 선택한 경우
    else {
      setSelectedCSP('');
      console.log('Selected CSP:', csp.target.value);
    }
  }

  const handleClickType = (type) => {
    const selectedTypeObj = _gcpCheckList.find((item) => item.type === type);
    console.log('Selected type:', type);

    if (selectedTypeObj) {
      setSelectedType(selectedTypeObj.type);
      setSelectedId(selectedTypeObj.id);
      console.log('Selected Type:', selectedTypeObj.type);
      console.log('Selected ID: ', selectedTypeObj.id);
    }
  };

  const handleClickId = (id) => {
    const selectedTypeObj = _gcpCheckList.find((item) => item.csp === id);
    // setSelectedId(id);
    if (selectedTypeObj){
      console.log('Selected ID: ', id);
    }
  };

  const handleClickDescription = (description) => {
    setSelectedDescription(description);
    console.log('Selected Description: ', description);
  }


//   const handleClickLabel = (labelId) => {
//     const selectedLabel = _gcpCheckList.find((item) => item.csp === labelId);
//   if (selectedLabel) {
//     console.log('Selected csp ID:', selectedLabel.type);
//   }
// };

// const handleClickId = (typeId) => {
//   const selectedId = _gcpCheckList.find((item) => item.id === typeId);
//   if (selectedId) {
//     console.log('Selected Type ID: ', selectedId.id)
//   }
// };
  // const selectedLabel = _gcpCheckList.find((label) => label.id === id);
  // if (selectedLabel) {
  //   const description = selectedLabel.description;
  //   console.log(`Description for id ${id}: ${description}`);
  // }

  // const handleClickLabel = useCallback(
  //   (labelId) => {
  //     if (!mdUp) {
  //       openNav.onFalse();
  //     }

  //     if (labelId) {
  //       const href =
  //         labelId !== LABEL_INDEX
  //           ? `${paths.dashboard.mail}?label=${labelId}`
  //           : paths.dashboard.mail;
  //       router.push(href);
  //     }
  //   },
  //   [openNav, router, mdUp]
  // );

  // const handleClickMail = useCallback(
  //   (mailId) => {
  //     if (!mdUp) {
  //       openMail.onFalse();
  //     }

  //     const href =
  //       selectedLabelId !== LABEL_INDEX
  //         ? `${paths.dashboard.mail}?id=${mailId}&label=${selectedLabelId}`
  //         : `${paths.dashboard.mail}?id=${mailId}`;

  //     router.push(href);
  //   },
  //   [openMail, router, selectedLabelId, mdUp]
  // );

  // useEffect(() => {
  //   if (mailsError || mailError) {
  //     router.push(paths.dashboard.mail);
  //   }
  // }, [mailError, mailsError, router]);

  // useEffect(() => {
  //   if (!selectedMailId && firstMailId) {
  //     handleClickMail(firstMailId);
  //   }
  // }, [firstMailId, handleClickMail, selectedMailId]);

  // useEffect(() => {
  //   if (openCompose.value) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = '';
  //   }
  // }, [openCompose.value]);

  // const renderLoading = (
  //   <LoadingScreen
  //     sx={{
  //       borderRadius: 1.5,
  //       bgcolor: 'background.default',
  //     }}
  //   />
  // );

  // const renderEmpty = (
  //   <EmptyContent
  //     title={`Nothing in ${selectedLabelId}`}
  //     description="This folder is empty"
  //     imgUrl="/assets/icons/empty/ic_folder_empty.svg"
  //     sx={{
  //       borderRadius: 1.5,
  //       maxWidth: { md: 320 },
  //       bgcolor: 'background.default',
  //     }}
  //   />
  // );
  

  const renderMailNav = (
    <MailNav
      // types={[...new Set([..._gcpCheckList, ..._adCheckList].map(item => item.type))]}
      types={_gcpCheckList.map((item) => item.type)}  // Pass all types to MailNav
      openNav={openNav.value}
      onCloseNav={openNav.onFalse}
      handleClickType={handleClickType}
      handleClickCSP={handleClickCSP}
      selectedType={selectedType}
      selectedCSP={selectedCSP}
    />
  );

  const renderIdList = (
    <IdList
      csp={_gcpCheckList.map((item) => item.csp)}
      openMail={openMail.value}
      onCloseMail={openMail.onFalse}
      handleClickId={handleClickId}
      selectedId={selectedId}
      // selectedMailId={selectedMailId}
    />
  );

  const renderMailDetails = (
    <>
     <MailDetails
      // laws={_gcpCheckList.map((item) => item.law)}
      selectedCompliances={_gcpCheckList.filter(item => {
        if (selectedCSP === '' || selectedCSP === undefined) {
          return true;
        } if (selectedCSP === 'aws') {
          return item.csp === 'aws';
        } if (selectedCSP === 'gcp') {
          return item.csp === 'gcp';
        } if (selectedCSP === 'ad') {
          return item.csp === 'ad';
        }
        return false; // 이외의 경우는 필터링하지 않음
      })}
    
      selectedDescription={selectedDescription}
      handleClickDescription={handleClickDescription}
      // compliances={{
      //   law: selectedCompliance?.law, // 선택된 항목의 law 데이터
      //   standard: selectedCompliance?.standard, // 선택된 항목의 standard 데이터
      // }}
    />
    {console.log("test", selectedCSP)}
      {/* {mailsEmpty ? (
        <EmptyContent
          imgUrl="/assets/icons/empty/ic_email_disabled.svg"
          sx={{
            borderRadius: 1.5,
            bgcolor: 'background.default',
            ...(!mdUp && {
              display: 'none',
            }),
          }}
        />
      ) : (
        <MailDetails
        renderLabel={(id) => _gcpCheckList.find((label) => label.id === id)}
      />
      )} */}
    </>
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Typography
          variant="h4"
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        >
          계정 관련 이슈 관리
        </Typography>

        <Stack
          spacing={1}
          sx={{
            p: 1,
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
            bgcolor: 'background.neutral',
          }}
        >
          {/* {!mdUp && (
            <MailHeader
              onOpenNav={openNav.onTrue}
              onOpenMail={mailsEmpty ? null : openMail.onTrue}
            />
          )} */}

          <Stack
            spacing={1}
            direction="row"
            sx={{
              minHeight: { md: 720 },
              height: { xs: 800, md: '72vh' },
            }}
          >
            {/* {console.log(_adCheckList)}
            {console.log(_gcpCheckList)} */}
            {renderMailNav}
            {/* {renderIdList} */}
            {renderMailDetails}

            {/* {mailsEmpty ? renderEmpty : renderMailList}

            {mailLoading ? renderLoading : renderMailDetails} */}
          </Stack>
        </Stack>
      </Container>

      {/* {openCompose.value && <MailCompose onCloseCompose={openCompose.onFalse} />} */}
    </>
  );
}
