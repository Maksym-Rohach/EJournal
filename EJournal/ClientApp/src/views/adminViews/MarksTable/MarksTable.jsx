import React, { Component } from 'react';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { Dropdown } from 'primereact/dropdown';
import { Table } from 'reactstrap';
function mapHeadTable(data) {
    console.log("head " + data.columns);
    if (data.columns != undefined) {
        return data.columns.map(function(item) {
            return (<th key={item}>{item}</th>);
        });
    }
}
function mapBodyTable(data) {
    let counter = 1;
    console.log("body " + data.rows);
    if (data.rows != undefined) {
        return data.rows.map(item => {
            return (
                <tr>
                    <th scope="row">{counter++}</th>
                    <td>{item.name}</td>
                    {
                        item.marks.map(mark => {
                            return (
                                <td key={mark}>{mark}</td>
                            )
                        })
                    }
                </tr>
            );
        });
    }
}
class MarksTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupId: 1,
            specialityId: 1,
            subjectId: 1
        };

        this.changeSpec = this.changeSpec.bind(this);
        this.changeGroup = this.changeGroup.bind(this);
        this.changeSubj = this.changeSubj.bind(this);


    }


    componentDidMount = () => {
        const { groupId, specialityId, subjectId } = this.state;
        this.props.getMarks({ groupId, specialityId, subjectId });
    }
    changeSpec(event) {
        const groupId = 0;
        const subjectId = 0;
        const specialityId = event.target.value;
        this.setState({ groupId: groupId, specialityId: specialityId, subjectId: subjectId });
        this.props.getMarks({ groupId, specialityId, subjectId });

    }
    changeGroup(event) {
        const subjectId = 0;
        const specialityId = this.state.specialityId;
        const groupId = event.target.value;
        this.setState({ groupId: groupId, specialityId: specialityId, subjectId: subjectId });
        this.props.getMarks({ groupId, specialityId, subjectId });
    }
    changeSubj(event) {
        const groupId = this.state.groupId;
        const specialityId = this.state.specialityId;
        const subjectId = event.target.value;
        this.setState({ groupId: groupId, specialityId: specialityId, subjectId: subjectId });
        this.props.getMarks({ groupId, specialityId, subjectId });
    }

    render() {
        const { data } = this.props;
        console.log("RENDER", data);
        const specs = data.specialities;
        const groups = data.groups;
        const subj = data.subjects;
        return (
            <React.Fragment>
                <Dropdown value={this.state.specialityId} options={specs} onChange={this.changeSpec} placeholder="Select a speciality" />
                <Dropdown value={this.state.groupId} options={groups} onChange={this.changeGroup} placeholder="Select a group" />
                <Dropdown value={this.state.subjectId} options={subj} onChange={this.changeSubj} placeholder="Select a subject" />

                <Table bordered>
                    <thead>
                        <tr>
                            {
                                mapHeadTable(data)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mapBodyTable(data)
                        }
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: get(state, 'marks.list.data'),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMarks: filter => {
            dispatch(getListActions.getMarks(filter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarksTable);
