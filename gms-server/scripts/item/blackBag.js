/*
    This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
                   Matthias Butz <matze@odinms.de>
                   Jan Christian Meyer <vimes@odinms.de>
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @description 拍卖行中心脚本（优化版）
 */
var OldTitle = "\t\t\t\t\t#e欢迎来到#rBeiDou#k脚本中心#n\t\t\t\t\r\n";
var status = -1;
var i = 0;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else if (mode === -1) {
        status--;
    } else {
        cm.dispose();
        return;
    }

    if (status === 0) {
        let text = OldTitle;
        text += "当前点券：" + cm.getPlayer().getCashShop().getCash(1) + "\r\n";
        text += "当前抵用券：" + cm.getPlayer().getCashShop().getCash(2) + "\r\n";
        text += "当前信用券：" + cm.getPlayer().getCashShop().getCash(4) + "\r\n";
        text += " \r\n\r\n";
		
		
		
		text += "#L1#每日签到#l \t #L3#传送自由#l \t #L61#超级传送#l \t \r\n";
		
		text += "#L0#新人福利#l \t #L4#爆率一览#l \t #L2#在线奖励#l\r\n"; 
		
        text += "#L10#皇家坐骑#l \t #L7#兑换点券#l \t #L8#兑换金币#l \t \r\n";
		
		 
		text += "#L9#血衣合成#l \t #L65#删除道具#l \t #L5#角色信息#l\r\n";
		
		
		
        if (cm.getPlayer().isGM()) {
            text += "\r\n\r\n";
            text += "\t\t\t\t#r=====以下内容仅GM可见=====\r\n";
			text += "#L69#测试脚本#l\r\n\r\n"; 
            text += "#L61#超级传送#l \t #L62#超级商店#l \t #L63#整容集合#l\r\n\r\n";
            text += "#L64#UI查询#l \t #L65#一键删除道具#l \t #L66#一键刷道具#l\r\n\r\n";
            text += "#L67#有状态脚本示例#l \t #L68#NextLevel脚本示例#l";
        }
        cm.sendSimple(text);
    } else if (status === 1) {
        doSelect(selection);
    } else {
        cm.dispose();
    }
}

function doSelect(selection) {
    switch (selection) {
        // 非GM功能
        case 0:
            openNpc("新人福利");
            break;
        case 1:
            openNpc("每日签到");
            break;
        case 2:
            openNpc("在线奖励");
            break;
        case 3:
            cm.getPlayer().saveLocation("FREE_MARKET");
            cm.warp(910000000, "out00");
            cm.dispose();
            break;
        case 4:
            openNpc("当前地图掉落");
            break;
        case 5:
            showCharacterInfo();
            break;
        case 6:
            organizeInventory();
            break;
        case 7:
            exchangeMesosToCash();
            break;
        case 8:
            exchangeCashToMesos();
            break;
        case 9:
            openNpc("血衣合成");
            break;
        case 10:
            openNpc("皇家坐骑");
            break;			
			
        // GM功能
        case 61:
            openNpc("万能传送");
            break;
        case 62:
            cm.dispose();
            cm.openShopNPC(9900001);
            cm.dispose();
            break;
        case 63:
            openNpc("Salon");
            break;
        case 64:
            openNpc("UI查询");
            break;
        case 65:
            openNpc("一键删除道具");
            break;
        case 66:
            openNpc("一键刷道具");
            break;
        case 67:
            openNpc("Example1");
            break;
        case 68:
            openNpc("Example2");
            break;
        case 69:
            openNpc("测试脚本");
            break;
        default:
            cm.sendOk("该功能暂不支持，敬请期待！");
            cm.dispose();
    }
}

function openNpc(scriptName) {
    cm.dispose();
    cm.openNpc(9900001, scriptName);
}

// 显示角色信息
function showCharacterInfo() {
    let player = cm.getPlayer();
    let info = "\t\t\t\t#e#r角色信息#k#n\r\n\r\n";
    info += "角色名称：" + player.getName() + "\r\n";
    info += "等级：" + player.getLevel() + "\r\n";
    info += "职业：" + player.getJob() + "\r\n";
    info += "当前经验：" + player.getExp() + "\r\n";
    info += "金币：" + player.getMeso() + "\r\n";
    info += "HP/MP：" + player.getHp() + "/" + player.getMp() + "\r\n";
    cm.sendOk(info);
    cm.dispose();
}

// 金币兑换点券
function exchangeMesosToCash() {
    let mesos = cm.getPlayer().getMeso();
    if (mesos < 1000000) {
        cm.sendOk("金币不足！至少需要100万金币才能兑换点券。");
        cm.dispose();
        return;
    }

    cm.gainMeso(-1000000); // 扣除100万金币
 //   cm.sendOk("金币扣除成功，正在增加点券...");
    cm.getPlayer().getCashShop().gainCash(1, 100000000);
    cm.sendOk("成功将100万金币兑换为1000点券！");
    cm.dispose();
}
// 点券兑换金币
function exchangeCashToMesos() {
    let cash = cm.getPlayer().getCashShop().getCash(1);
    if (cash >= 1000) { // 至少需要1000点券
    cm.getPlayer().getCashShop().gainCash(1, -1000);
        cm.gainMeso(1000000); // 增加100万金币
        cm.sendOk("成功将1000点券兑换为100万金币！");
    } else {
        cm.sendOk("点券不足！至少需要1000点券才能兑换金币。");
    }
    cm.dispose();
}