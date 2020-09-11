import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { window, wsize, hsize } from '../entities/constants';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import PhotoCarousel from './PhotoCarousel';
import PhotoGrid from './PhotoGrid';
import Tag from './Tag';
import TextButton from './TextButton';
import firebase from '../services/firebase/index';
import CommentForm from './CommentForm';
import * as lookApi from '../services/api/look'

const iconSize = wsize(28);

const HeartButton = React.memo(({ look, updateLikes }) => {
    const [liked, setLiked] = useState(false);
    const currentUser = firebase.auth().currentUser;
    const likeHandler = () => {
        setLiked(true)
        updateLikes(1)
        lookApi.likeLook(look.id);
    };
    const dislikeHandler = () => {
        setLiked(false)
        updateLikes(-1)
        lookApi.dislikeLook(look.id);
    };
    useEffect(() => {
        if (look.likes.find((like) => like === currentUser.uid)) setLiked(true);
    }, []);
    return (
        <TouchableOpacity
            onPress={() => {
                liked ? dislikeHandler() : likeHandler();
            }}>
            <AntDesign
                name={liked ? 'heart' : 'hearto'}
                size={iconSize}
                color={liked ? 'red' : 'black'}
                style={styles.postActionIcon}
            />
        </TouchableOpacity>
    );
});


const Post = React.memo(({ look, navigation }) => {
    const currentUser = firebase.auth().currentUser;
    const [numOfLikes, setNumOfLikes] = useState(look.likes.length);
    const clickEventListener = React.useCallback((item) => {
        navigation.navigate('Item', { fetchId: item.id });
    });
    const profileClickHandler = () => {
        navigation.navigate('OtherProfile', { user: look.author });
    };
    const carouselOrGrid = look.coverImage ? (
        <PhotoCarousel
            data={[{ image: look.coverImage }, ...look.images]}
            clickEventListener={clickEventListener}
        />
    ) : (
            <PhotoGrid items={[...look.images]} clickEventListener={clickEventListener} />
        );
    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeaderContainer}>
                <TouchableOpacity
                    style={styles.postHeaderFirst}
                    onPress={profileClickHandler}>
                    <Image
                        source={{
                            uri: look.author.photo,
                        }}
                        style={styles.postHeaderIcon}
                    />
                    <Text style={styles.postHeaderProfileName}>
                        {look.author.userName}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postHeaderSecond}>
                    <Entypo name="dots-three-horizontal" size={wsize(24)} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.postDescription}>
                <Text>{look.description}</Text>
            </View>
            <View style={styles.postImageContainer}>{carouselOrGrid}</View>
            <View style={styles.postActionsContainer}>
                <View style={styles.postActionsLeft}>
                    <HeartButton look={look} updateLikes={(val) => setNumOfLikes(numOfLikes + val)} />
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Comments', { photoUrl: currentUser.photoURL, postId: look.id });
                    }}>
                        <Feather
                            name="message-circle"
                            size={iconSize}
                            color="black"
                            style={styles.postActionIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Entypo
                            name="direction"
                            size={iconSize}
                            color="black"
                            style={styles.postActionIcon}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Feather
                        name="bookmark"
                        size={iconSize}
                        color="black"
                        style={styles.postActionIcon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.likesContainer}>
                <Text style={styles.likesText}>{numOfLikes} likes</Text>
            </View>
            <View style={styles.postInfoContainer}>
                <TouchableOpacity onPress={profileClickHandler}>
                    <Text style={styles.profileName}>{look.author.userName}</Text>
                </TouchableOpacity>
                {look.tags.map((tag, index) => {
                    return <Tag title={tag} key={index} />;
                })}
            </View>
            <TouchableOpacity
                style={styles.viewComments}
                onPress={() => {
                    navigation.navigate('Comments', { photoUrl: currentUser.photoURL, postId: look.id });
                }}>
                <Text style={{ color: "grey" }}>View all comments</Text>
            </TouchableOpacity>
            <CommentForm photoUrl={currentUser.photoURL} postId={look.id} />
        </View>
    );
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
    },
    likesContainer: {
        paddingHorizontal: wsize(4),
        marginBottom: hsize(11),
    },
    likesText: {},
    profileName: {
        color: '#0148FF',
        fontWeight: 'bold',
    },
    viewComments: {
        marginLeft: wsize(2),
    },
    postContainer: {
        marginHorizontal: wsize(12),
        marginBottom: hsize(30),
    },
    postHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: hsize(11),
    },
    postHeaderFirst: {
        flexDirection: 'row',
    },
    postHeaderSecond: {
        marginRight: wsize(2),
    },
    postHeaderProfileName: {
        alignSelf: 'center',
        fontWeight: '500',
        fontSize: wsize(14),
        marginLeft: wsize(9),
        color: '#262626',
    },
    postDescription: {
        width: '100%',
        padding: hsize(4),
    },
    postImageContainer: {
        // justifyContent: 'center',
        // alignItems: 'center',
        // marginBottom: hsize(41),
    },
    postImage: {
        width: wsize(349),
        height: hsize(340),
    },
    postActionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hsize(13),
    },
    postActionsLeft: {
        flexDirection: 'row',
        marginLeft: wsize(10),
    },
    postActionIcon: {
        marginRight: wsize(10),
    },
    postInfoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: wsize(2),
    },
})
export default Post;