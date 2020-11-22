import Head from "next/head";
import styles from "../styles/Home.module.css";
import MapChart from "../components/map";
import useSWR from "swr";
import {
  Grid,
  GridItem,
  Image,
  Popover,
  PopoverTrigger,
  Button,
  Portal,
  PopoverContent,
  Center,
  Box,
  Heading,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  Text,
  PopoverCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { useState } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/fetch", fetcher);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [daindex, setIndex] = useState(0);
  let title = "Singapore Traffic Monitor";
  let description = "View live imagery from traffic cameras around the island.";
  let image =
    "https://cloud-bffijv1wu.vercel.app/0e994e359-db3e-4d29-89cc-d2bf3d6ad391.jpg";
  if (!data)
    return (
      <div
        style={{
          padding: "20px",
          backgroundColor: "#1A202C",
          height: "100vh",
          color: "white",
        }}
      >
        <Head>
          <title>{title}</title>
          <meta property="og:title" content={title} />
          <meta name="twitter:title" content={title} />
          <meta property="og:type" content="website" />
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
          <meta property="og:image" content={image} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={image} />
        </Head>
        <Center>
          <Heading>Loading...</Heading>
        </Center>
      </div>
    );
  const handleIndexClick = (newIndex) => {
    setIndex(newIndex);
    onOpen();
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#1A202C" }}>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <meta property="og:type" content="website" />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={image} />
      </Head>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)", "repeat(6, 1fr)"]}
        gap={4}
      >
        <GridItem
          colSpan={["1", "3", "3"]}
          p="4"
          borderRadius="lg"
          color="white"
        >
          <Heading fontSize="40px">Singapore Traffic Monitor</Heading>
          <br />
          <Heading
            fontSize="30px"
            display={["none", "none", "none", "none", "inline-block"]}
          >
            Current time:{" "}
            <span style={{ fontWeight: "400" }}>
              {new Date().toLocaleString()}
            </span>
          </Heading>
        </GridItem>
        {data.map((camera, index) => (
          <GridItem colSpan={1} p="1">
            <Box
              style={{ background: "grey" }}
              borderRadius="lg"
              boxShadow="md"
            >
              <Image
                onClick={() => handleIndexClick(index)}
                width="100%"
                height={["100%", "150px", "150px"]}
                src={
                  camera["image_metadata"].md5 !=
                  "b5fb3395e22ca1564fc5c16ef746e8a9"
                    ? camera.image
                    : "https://cdn.hashnode.com/res/hashnode/image/upload/v1571300841959/Yjr-2Gwib.jpeg"
                }
                borderRadius="lg"
                boxShadow="md"
              />
            </Box>
          </GridItem>
        ))}
      </Grid>
      <Modal
        blockScrollOnMount={true}
        size="full"
        isOpen={isOpen}
        onClose={onClose}
        p="20px"
      >
        <ModalOverlay width="100vw" />
        <ModalContent
          borderRadius="lg"
          maxWidth="700px"
          width="100vh"
          mt="0"
          m="20px"
          p="20px"
          backgroundColor="#2D3748"
          height={[
            "calc(100% - 40px)",
            "calc(100% - 40px)",
            "calc(100% - 40px)",
          ]}
          color="white"
        >
          <ModalBody>
            <Image
              width="100%"
              borderRadius="lg"
              boxShadow="md"
              onDoubleClick={() => handleIndexClick(0)}
              src={data[daindex].image}
            />
            <br />
            <Heading>Camera #{data[daindex].camera_id}</Heading>
            <Text pt="2">
              <strong>Longitude:</strong> {data[daindex].location.longitude}
            </Text>
            <Text pt="2">
              <strong>Latitude:</strong> {data[daindex].location.latitude}
            </Text>
            <Text pt="2">
              <strong>Time taken:</strong> {data[daindex].timestamp}
            </Text>
            <br />
            <Button
              onClick={onClose}
              color="black"
              display={["block", "block", "none"]}
            >
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div
        style={{
          color: "white",
          textAlign: "center",
          width: "100%",
          fontSize: "18px",
          marginTop: "30px",
          marginBottom: "30px",
          fontFamily: "Perfect DOS VGA 437",
        }}
      >
        Built by{" "}
        <a href="https://github.com/sampoder" style={{ fontWeight: "800" }}>
          @sampoder
        </a>{" "}
        with data from{" "}
        <a href="https://data.gov.sg" style={{ fontWeight: "800" }}>
          data.gov.sg
        </a>
        .
      </div>
    </div>
  );
}
