import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../LandingPage/Style/LandingPage.css';
import {WithContext as ReactTags} from 'react-tag-input';
import '../LandingPage/Style/LandingPage.css';
//import ReactTags from 'react-tag-autocomplete';

const HobbiesToMap = [
    "Ballet",
    "Cooking",
    "Coding",
    "C#",
    "French Speaking",
    "French Writing",
    "Hebrew Speaking",
    "Hebrew Writing",
    "Spanish Speaking",
    "Spanish Writing",
    "Football",
    "The History of ancient Egypt",
    "Basketball",
    "Smart Shopping",
    "NodeJS",
    "MongoDB",
    "Hip-Hop Dancing",
    "Modern Fashion",
    "Italian Cuisine",
    "Riding Bikes",
    "Riding Skates",
    "Playing Guitar",
    "Playing Piano",
    "Web Development",
    "Healthy Living",
    "Healthy Cooking",
    "DIY",
    "Judo",
    "Karate",
    "Jiu-Jitsu",
    "Boxing",
    "Writing Poetry",
    "Writing Books",
    "Mexican Culture"
];

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const suggestions = HobbiesToMap.map((Hobby) => {
    return {
        id: Hobby,
        text: Hobby
    }
})


export default class SkillsInputContainer extends React.Component {
    constructor(props) {
        super(props);
        if (!this.props.newUser) {
            this.getUser();
        }

        this.state = {
            tags: [],
            suggestions: suggestions,
            newUser: true,
            errMsg: "",
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleTagClick = this.handleTagClick.bind(this);
    }

    componentWillMount() {
        this.setState({
            newUser: this.props.newUser,
        });
    }

    getUser() {
        return fetch('users/user?userName=' + this.props.userName, {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then(content => {
                if (this.props.mySkills != undefined && this.props.mySkills) {
                    this.setState({
                        tags: content.user.mySkills,
                    })
                }
                else if (this.props.desiredSkills != undefined && this.props.desiredSkills) {
                    this.setState({
                        tags: content.user.desiredSkills,
                    })
                }


            })
            .catch(err => {
                throw err
            });
    }

    getTags() {
        return this.state.tags;
    }

    handleDelete(i) {
        const {tags} = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        if(HobbiesToMap.indexOf(tag.text) != -1) {
            this.setState(state => ({tags: [...state.tags, tag],errMsg:""}));
        }
        else{
            this.setState(state => ({errMsg:tag.text + " is not a valid skill"}));
        }
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({tags: newTags});
    }

    handleTagClick(index) {
        console.log('The tag at index ' + index + ' was clicked');
    }

    render() {
        const {tags, suggestions} = this.state;
        return (
            <div className={this.props.myClass}> {this.props.skillsTitle}:
                <ReactTags
                    tags={tags}
                    suggestions={suggestions}
                    delimiters={delimiters}
                    placeholder="Add new skill"
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    handleTagClick={this.handleTagClick}
                />
                {this.state.errMsg}
            </div>
        );
    }
}
