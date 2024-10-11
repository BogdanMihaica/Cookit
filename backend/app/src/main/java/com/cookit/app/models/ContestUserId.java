package com.cookit.app.models;

import java.io.Serializable;

public class ContestUserId implements Serializable {
    private Integer userId;
    private Integer contestId;

    public ContestUserId() {}

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getContestId() {
        return contestId;
    }

    public void setContestId(Integer contestId) {
        this.contestId = contestId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ContestUserId)) return false;
        ContestUserId that = (ContestUserId) o;
        return userId.equals(that.userId) && contestId.equals(that.contestId);
    }

    @Override
    public int hashCode() {
        return 31 * userId.hashCode() + contestId.hashCode();
    }
}
